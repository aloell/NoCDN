(function(){
var malShow=document.getElementById("mal");
malShow.innerHTML="hello world2!";
var leftCol=document.getElementById("leftCol");
var embedPage=document.createElement("iframe");
embedPage.src="TMNT.html";
embedPage.width=1200;
embedPage.height=900;
leftCol.appendChild(embedPage);
})();
