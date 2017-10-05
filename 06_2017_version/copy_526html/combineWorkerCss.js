onmessage=function(e)
{
	var counter=e.data[0];
	var toRender={};
	if(counter===0)
	{
		var originText=e.data[1];
		var nextLevelObj=e.data[2];
		var peerUrl=e.data[3];
		var cssUrl=e.data[4];
		var myPattern=/url\(.*\)/g;
		var cssResult;
        cssResult=originText.replace(myPattern,function(match){
        	var relativeDeepUrl=match.substring(5,match.length-2);
	  		var absoluteDeepUrl=peerUrl+relativeDeepUrl;
        	var newPart="url("+nextLevelObj[absoluteDeepUrl]+")";
        	return newPart;
        });
        toRender["content"]='data:text/css;charset=utf-8,'+encodeURIComponent(cssResult);
        toRender["url"]=cssUrl;
        toRender["status"]=1;
        postMessage(toRender);
	}
}