onmessage=function(e)
{
    var thisLevelUrl=e.data[0];
    var peerUrl=e.data[1];
    var nextLevelPara=[];
    nextLevelPara[1]=peerUrl;
    var imgWorker=new Worker("imgWorker.js");
    var scriptWorker=new Worker("scriptWorker.js");
    var cssWorker=new Worker("cssWorker.js");
    var combineWorker=new Worker("combineWorkerHtml.js");
    var counter=0;
    var nextLevelObj={};
    var originText;
    function failFetch()
    {
    	console.log("fail Fetch!!!!");
    	var toRender={};
		toRender["url"]=thisLevelUrl;
		toRender["status"]=0;
		toRender["content"]=originText;
		postMessage(toRender);
		imgWorker.terminate();
		cssWorker.terminate();
		scriptWorker.terminate();
		combineWorker.terminate();
    }
    function wHandler(e)
    {
    	var name=e.data["url"];
    	var content=e.data["content"];
    	var status=e.data["status"];
    	if(status===1)
    	{
    		if(nextLevelObj[name]==undefined)
    			nextLevelObj[name]=content;
    		var passing=[];
    		counter--;	
    		passing[0]=counter;
    		passing[1]=originText;
    		passing[2]=nextLevelObj;
    		passing[3]=peerUrl;
    		passing[4]=thisLevelUrl;
    		console.log("in html worker:"+name);
    		combineWorker.postMessage(passing);
    	}
    	else if(status===0)
    	{
    		console.log("status 0 to fail Fetch!!!!");
    		failFetch();
    	}
    	else
    	{
    		failFetch();
    		console.log("html status abnormal"+thisLevelUrl);
    	}
    }
    imgWorker.onmessage=wHandler;
    scriptWorker.onmessage=wHandler;
    cssWorker.onmessage=wHandler;
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
        	//match src="" only, not src='' and assume urls in src are relative urls
			//there could be script file in this page, not yet implemnt handler for it now
			var imgTagPattern=/<img src=(\"|\').*\.(png|jpg|gif)(\"|\')/g;
			var linkTagPattern=/<link href=(\"|\').*\.(png|jpg|gif|css)(\"|\')/g;
			var scriptTagPattern=/<script src=(\"|\').*\.(js)(\"|\')/g;
        	var imgMatchResult=text.match(imgTagPattern);
        	var linkTagMatchResult=text.match(linkTagPattern);
        	var scriptMatchResult=text.match(scriptTagPattern);
        	var l1=0,l2=0,l3=0;
        	if(imgMatchResult!=null)
        		l1=imgMatchResult.length;
        	if(linkTagMatchResult!=null)
        		l2=linkTagMatchResult.length;
        	if(scriptMatchResult!=null)
        		l3=scriptMatchResult.length;
        	counter=l1+l2+l3;
        	if(counter==0)
        		globalSelf.postMessage(originText);
			var extendedFrame1;
			var extendedFrame2;
			var extendedFrame3;
        	var relativeDeepUrl;
        	var absoluteDeepUrl;
        	var i=0;
        	var sentImgRequests={};
        	//for every url found, check if we've obtained, if not, download it.
        	if(imgMatchResult!=null)
        	{
        		for(i=0;i<imgMatchResult.length;i++)
        		{
          			relativeDeepUrl=imgMatchResult[i].substring(10,imgMatchResult[i].length-1);
          			absoluteDeepUrl=peerUrl+relativeDeepUrl;
          			nextLevelPara[0]=absoluteDeepUrl;
          			if(sentImgRequests[absoluteDeepUrl]===undefined)
          			{
          				sentImgRequests[absoluteDeepUrl]=true;
          				imgWorker.postMessage(nextLevelPara);
          			}
          			else
          			{
          				console.log("in html worker for img:"+absoluteDeepUrl);
          				counter--;
          			}
        		}
        	}
        	if(linkTagMatchResult!=null)
        	{
				for(i=0;i<linkTagMatchResult.length;i++)
        		{
          			relativeDeepUrl=linkTagMatchResult[i].substring(12,linkTagMatchResult[i].length-1);
          			absoluteDeepUrl=peerUrl+relativeDeepUrl;
					if(relativeDeepUrl.endsWith("css"))
					{
						nextLevelPara[0]=absoluteDeepUrl;
          				cssWorker.postMessage(nextLevelPara);
					}
					else
					{
						nextLevelPara[0]=absoluteDeepUrl;
						imgWorker.postMessage(nextLevelPara);
					}
        		}
        	}
        	if(scriptMatchResult!=null)
        	{
        		for(i=0;i<scriptMatchResult.length;i++)
        		{
          			relativeDeepUrl=scriptMatchResult[i].substring(13,scriptMatchResult[i].length-1);
          			absoluteDeepUrl=peerUrl+relativeDeepUrl;
          			nextLevelPara[0]=absoluteDeepUrl;
          			scriptWorker.postMessage(nextLevelPara);
        		} 
        	}
    	}
		else
		{
			console.log("network error fail Fetch!!!!");
			failFetch();
		}
	}
	xhttp.send();
};