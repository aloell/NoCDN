onmessage=function(e)
{
    var thisLevelUrl=e.data[0];
    var peerUrl=e.data[1];
    var nextLevelPara=[];
    nextLevelPara[1]=peerUrl;
    var imgWorker=new Worker("imgWorker.js");
    var cssWorker=new Worker("cssWorker.js");
    var htmlWorker=new Worker("htmlWorker.js");
    var combineWorker=new Worker("combineWorkerScript.js");
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
		cssWorker.terminate();
		htmlWorker.terminate();
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
    		console.log("script status abnormal"+thisLevelUrl);
    	}
    }
    imgWorker.onmessage=wHandler;
    htmlWorker.onmessage=wHandler;
    cssWorker.onmessage=wHandler;
    var globalSelf=this;
    combineWorker.onmessage=function(e)
    {
    	globalSelf.postMessage(e.data);
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", thisLevelUrl, true);
    function getFileType(fileUrl)
	{
		if(fileUrl.endsWith(".html")||fileUrl.endsWith(".php"))
			return 0;
		else if(fileUrl.endsWith(".gif")||fileUrl.endsWith(".png")||fileUrl.endsWith(".jpg"))
			return 1;
		else if(fileUrl.endsWith(".css"))
			return 2;
		else
			return 3;
	}

    xhttp.onload=function()
    {
    	if (xhttp.readyState === XMLHttpRequest.DONE&&xhttp.status == 200) {
        	var text=xhttp.responseText;
        	originText=text;
        	//match src="" only, not src='' and assume urls in src are relative urls
			var myPattern=/src=\".*\";/g;
        	var matchResult=text.match(myPattern);
        	if(matchResult!=null)
        		counter=matchResult.length;
        	else
        		globalSelf.postMessage(originText);
			var extendedScript=text;
        	var relativeDeepUrl;
        	var absoluteDeepUrl;
        	var i=0;
        	var embedFileType;
        	//for every url found, check if we've obtained, if not, download it.
        	for(i=0;i<matchResult.length;i++)
        	{
          		relativeDeepUrl=matchResult[i].substring(5,matchResult[i].length-2);
          		absoluteDeepUrl=peerUrl+relativeDeepUrl;
	  			embedFileType=getFileType(absoluteDeepUrl);
	  			if(embedFileType===0)
	  			{
	  				nextLevelPara[0]=absoluteDeepUrl;
					htmlWorker.postMessage(nextLevelPara);
	  			}
	  			else if(embedFileType===1)
	  			{
	  				nextLevelPara[0]=absoluteDeepUrl;
          			imgWorker.postMessage(nextLevelPara);
	  			}
	  			else if(embedFileType===2)
          		{
          			nextLevelPara[0]=absoluteDeepUrl;
					cssWorker.postMessage(nextLevelPara);
          		}
	  			else 
          		{
					//contains url of unknown type;
	  			}
        	}
    	}
		else
		{
			failFetch();
		}
	}
	xhttp.send();
};