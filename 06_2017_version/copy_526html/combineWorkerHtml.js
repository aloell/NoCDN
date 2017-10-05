onmessage=function(e)
{
	var counter=e.data[0];
	var toRender={};
	if(counter===0)
	{
		var originText=e.data[1];
		var nextLevelObj=e.data[2];
		var peerUrl=e.data[3];
		var frameUrl=e.data[4];
		var imgTagPattern=/<img src=(\"|\').*\.(png|jpg|gif)(\"|\')/g;
		var linkTagPattern=/<link href=(\"|\').*\.(png|jpg|gif|css)(\"|\')/g;
		var scriptTagPattern=/<script src=(\"|\').*\.(js)(\"|\')/g;
		//to optimize, it can be changeed to fetch one, verify one, replace one
        var extendedText1=originText.replace(imgTagPattern,function(match){
          	var newPart;
			var relativeDeepUrl=match.substring(10,match.length-1);
          	var absoluteDeepUrl=peerUrl+relativeDeepUrl;
            newPart='<img src="'+nextLevelObj[absoluteDeepUrl]+'"';
          	return newPart;
        });
        var extendedText2=extendedText1.replace(linkTagPattern,function(match){
          	var newPart;
			var relativeDeepUrl=match.substring(12,match.length-1);
          	var absoluteDeepUrl=peerUrl+relativeDeepUrl;
            newPart='<link href="'+nextLevelObj[absoluteDeepUrl]+'"';
          	return newPart;
        });
        var extendedText3=extendedText2.replace(scriptTagPattern,function(match){
          	var newPart;
			var relativeDeepUrl=match.substring(13,match.length-1);
          	var absoluteDeepUrl=peerUrl+relativeDeepUrl;
            newPart='<script src="'+nextLevelObj[absoluteDeepUrl]+'"';
          	return newPart;
        });
        toRender["url"]=frameUrl;
        toRender["status"]=1;
        toRender["content"]='data:text/html;charset=utf-8,'+encodeURIComponent(extendedText3);
        postMessage(toRender);
	}
}