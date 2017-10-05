onmessage=function(e)
{
	console.log("test_re1.js receive message!");
	postMessage(e.data);
};