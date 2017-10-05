onmessage=function(e)
{
	var counter=e.data[0];
	var toRender={};
	if(counter===0)
	{
		var originText=e.data[1];
		var nextLevelObj=e.data[2];
		var peerUrl=e.data[3];
		var scriptUrl=e.data[4];
		var myPattern=/src=\".*\";/g;
		var extendedScript=originText.replace(myPattern,function(match){
          	var newPart;
			var relativeDeepUrl=match.substring(5,match.length-2);
          	var absoluteDeepUrl=peerUrl+relativeDeepUrl;
            newPart='src="'+nextLevelObj[absoluteDeepUrl]+'";';
          	return newPart;
        });
      	toRender["content"]='data:text/javascript;charset=utf-8,'+encodeURIComponent(extendedScript);
        toRender["url"]=scriptUrl;
        toRender["status"]=1;
        postMessage(toRender);
	}
}