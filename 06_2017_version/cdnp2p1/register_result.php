<?php
require_once("regis_functions.php");
require_once("top.php");
?>
<?php
$erro_msg="";
if(!registerUser($erro_msg))
{
//echo $erro_msg;
?>

<p>Sorry, your registration fails. Please follow the instructions above.</p>
<br/>

<?php
}
else
{
?>
<p>Congrat <?= htmlspecialchars($_POST["first_name"])
." ".htmlspecialchars($_POST["last_name"])." !" ?>
You have signed up successfully.</p>
<?php
}
require_once("bottom.php");
?>