onmessage=function(e)
{
    var thisLevelUrl=e.data[0];
    
    var originImg;
    var toRender={};
    
    var peerUrl=e.data[1];
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", thisLevelUrl, true);
    xhttp.responseType = "arraybuffer";
    xhttp.onload=function()
    {
    	if (xhttp.readyState === XMLHttpRequest.DONE&&xhttp.status == 200) {
        	originImg=xhttp.response;
        	var imgByteArray=new Uint8Array(originImg);
        	var i=0;
        	var result=String.fromCharCode(imgByteArray[0]);
     		for(i=1;i<imgByteArray.length;i++)
      		{
        		temp=String.fromCharCode(imgByteArray[i]);
        		result=result+temp;
      		}
      		var content='data:image/png;base64,'+btoa(result);
      		toRender["url"]=thisLevelUrl;
			toRender["status"]=1;
			toRender["content"]=content;
			postMessage(toRender);
    	}
		else
		{
			toRender["url"]=thisLevelUrl;
			toRender["status"]=0;
			toRender["content"]="";
			postMessage(toRender);
		}
	}
	xhttp.send();
};