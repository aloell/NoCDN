onmessage=function(e)
{
    var thisLevelUrl=e.data[0];
    var peerUrl=e.data[1];
    var nextLevelPara=[];
    nextLevelPara[1]=peerUrl;
    var imgWorker=new Worker("imgWorker.js");
    var combineWorker=new Worker("combineWorkerCss.js");
    var counter=0;
    var nextLevelObj={};
    var originText;
    function failFetch()
    {
    	var toRender={};
		toRender["url"]=thisLevelUrl;
		toRender["status"]=0;
		toRender["content"]=originText;
		postMessage(toRender);
		imgWorker.terminate();
		combineWorker.terminate();
    }
    function wHandler(e)
    {
    	var name=e.data["url"];
    	var content=e.data["content"];
    	var status=e.data["status"];
    	if(status===1)
    	{
    		if(nextLevelObj[name]===undefined)
    		{
    			nextLevelObj[name]=content;
    		}
    		var passing=[];
    		counter--;	
    		passing[0]=counter;
    		passing[1]=originText;
    		passing[2]=nextLevelObj;
    		passing[3]=peerUrl;
    		passing[4]=thisLevelUrl;
    		combineWorker.postMessage(passing);
    	}
    	else if(status===0)
    	{
    		failFetch();
    	}
    	else
    	{
    		failFetch();
    		console.log("css status abnormal"+thisLevelUrl);
    	}
    }
    imgWorker.onmessage=wHandler;
    var globalSelf=this;
    combineWorker.onmessage=function(e)
    {
    	globalSelf.postMessage(e.data);
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", thisLevelUrl, true);
    xhttp.onload=function()
    {
    	if (xhttp.readyState === XMLHttpRequest.DONE&&xhttp.status == 200) {
        	var text=xhttp.responseText;
        	originText=text;
        	var myPattern=/url\(.*\)/g;
        	var matchResult=text.match(myPattern);
        	if(matchResult!=null)
        		counter=matchResult.length;
        	else
        		globalSelf.postMessage(originText);
        	//assume url in css is a image and url is relative here
        	var relativeDeepUrl;
			var absoluteDeepUrl;
        	var i=0;
        	//for every url found, check if we've obtained, if not, download it.
        	for(i=0;i<matchResult.length;i++)
        	{
          		relativeDeepUrl=matchResult[i].substring(5,matchResult[i].length-2);
          		absoluteDeepUrl=peerUrl+relativeDeepUrl;
          		nextLevelPara[0]=absoluteDeepUrl;
				imgWorker.postMessage(nextLevelPara);
        	}	
    	}
		else
		{
			failFetch();
		}
	}
	xhttp.send();
};