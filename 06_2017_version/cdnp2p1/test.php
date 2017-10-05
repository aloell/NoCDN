<?php
function addy(&$yy)
{
echo "<strong>here is a check point!</strong>";
$yy++;
return $yy;
}
function fakeAdd($yy)
{
$yy++;
return $yy;
}

/*$email='jxx133@case.edu';
$db=new PDO("mysql:dbname=login_demo","admin001","1963xjb");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt=$db->prepare("SELECT * FROM user_info WHERE email=:ee");
$stmt->bindParam(":ee",$email,PDO::PARAM_STR);
$stmt->execute();
$rows=$stmt->fetchAll();
print_r($rows);
echo $rows[1]['last_name'];*/

/*session_start();
$_SESSION['test']='test';
print_r($_SESSION);
echo session_id();
session_destroy();
//session_regenerate_id(TRUE);
echo "<br/>";
echo session_id()."checkpoint";
print_r($_SESSION);
echo "<br/>";
echo isset($_SESSION);
session_start();
echo isset($_SESSION);
print_r($_SESSION);
echo session_id();
$_SESSION['lily']='lily';*/
//header("Location: test2.php");

/*$_SESSION['po']='po';
echo isset($_SESSION);
echo session_id();
print_r($_SESSION);
echo "separate line!";
session_start();
echo session_id();
print_r($_SESSION);
$_SESSION['jily']='jily';
header("Location: test2.php");*/

session_start();
$_SESSION['lily']='lily';
print_r($_SESSION);
echo session_id()."<br/>";
session_destroy();
session_start();
print_r($_SESSION);
echo session_id()."<br/>";

/*session_start();
print_r($_SESSION);
echo session_id()."<br/>";*/
?>

<html>
<body>
<form action='test.php' method='post'>
email:<input type='text' name='email'/>
<input type="submit" value="Log in"/>
</form>


</body>
</html>