<?php require_once("top.php") ?>
<?php
if(isset($_SESSION["name"]))
{
header("Location: log_process.php");
die;
}
else
{
?>
<form action="log_process.php" method="post">
	<fieldset>
		<legend>Log in</legend>
		
		<label class="heading" for="email">E-mail:</label>
		<input type="email" name="email"/><br/>
		
		<label class="heading" for="password">Password:</label>
		<input type="password" name="password"/><br/>
		
		<input type="submit" value="Log in"/>
	</fieldset>
</form>
<?php 
} 
?>
<?php require_once("bottom.php") ?>
