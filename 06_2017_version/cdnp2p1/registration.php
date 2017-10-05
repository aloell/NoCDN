<?php require_once("top.php") ?>
<form action="register_result.php" method="post">
	<fieldset>
		<legend>New User Sign Up</legend>
		<label class="heading" for="first_name">First Name:</label>
		<input type="text" name="first_name"/><br/>
		
		<label class="heading" for="last_name">Last Name:</label>
		<input type="text" name="last_name"/><br/>
		
		<label class="heading" for="email">E-mail:</label>
		<input type="email" name="email"/><br/>
		
		<label class="heading" for="password">Password:</label>
		<input type="password" name="password"/><br/>
		
		<input type="submit" value="Sign Up"/>
	</fieldset>
</form>
<?php require_once("bottom.php") ?>