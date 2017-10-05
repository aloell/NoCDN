<!DOCTYPE html>
<html>
<head>
<title>Content Distribution Site via P2P</title>
<link href="decoration.css" type="text/css" rel="stylesheet"/>
</head>
<body>
	<h1>CDN by P2P client site</h1>
	<ul id="navigation">
		<li><a href="index.php">Main Page</a></li>
		<li><a href="registration.php">sign up</a></li>
		<li><a href="login.php">log in/out</a></li>
	</ul>
	<br/>
	<?php
		if(!isset($_SESSION))
		{
			session_start();
		}
		if(isset($_SESSION["name"]))
		{
			echo "<p>You are logged in as: ".$_SESSION["name"]."</p>";
		}
		if(isset($_SESSION["hintword"]))
		{
	?>
			<div id="hint"><?= $_SESSION["hintword"]; ?></div>
	<?php
			unset($_SESSION["hintword"]);
		}
	?>
		
