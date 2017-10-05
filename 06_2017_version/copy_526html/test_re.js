onmessage=function(e)
{
	var url=e.data;
	var xhttp=new XMLHttpRequest();
	var toReturn;
	xhttp.open("GET",url,true);
	var echoer=new Worker("test_re1.js");
	var content={}
	content["inner"]="hello test_re1 from test_re!";
	
	var parentSelf=this;
	echoer.onmessage=function(e)
	{
		toReturn=e.data;
		parentSelf.postMessage(toReturn);
	};
	xhttp.onreadystatechange=function()
	{
		if(xhttp.readyState===4&&xhttp.status===200)
		{
			echoer.postMessage(content);
			toReturn=btoa("xxx");
			postMessage(toReturn);
		}
	}
	xhttp.send();
};