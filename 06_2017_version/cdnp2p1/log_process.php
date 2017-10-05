<?php
session_start();
function redirect($URLaddr,$hintWord)
{
	/*if(!isset($_SESSION))
	{
	session_start();
	}*/
	$_SESSION["hintword"]=$hintWord;
	header("Location: $URLaddr");
	die;
}
if(isset($_SESSION["name"]))
{
	print "inif";
	session_destroy();
	//session_regenerate_id(TRUE);
	session_start();
	redirect("index.php","Log out successfully!");
}
else
{
	print "inelse";
	$email=$_POST["email"];
	$pwd=md5($_POST["password"]);
	$db=new PDO("mysql:dbname=login_demo","admin001","1963xjb");
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	/*$db->setAttribute(PDO::ATTR_AUTOCOMMIT,FALSE);*/
	$stmt=$db->prepare("SELECT first_name,last_name, password FROM user_info WHERE email=:ee");
	$stmt->execute(array(":ee"=>$email));
	/*$questi='SELECT name,mate FROM xxx WHERE age=89';
	$stmt=$db->query($questi);
	print_r($stmt);
	$row=$stmt->fetchObject();
	echo $row->mate;*/
	$numberofRES=$stmt->rowcount();
	//echo $numberofRES;
	$rows=$stmt->fetchObject();
	if($numberofRES>1)
	{
		$error_msg="There are more than one account for this email!";
		redirect("login.php","Sorry, internal error happened! Please retry later!");
	}
	else if($numberofRES===0)
	{
		$error_msg="No such an account exists!";
		redirect("login.php",$error_msg);
	}
	else
	{
		$pwdinDB=$rows->password;
		if($pwdinDB===$pwd)
		{
			//echo "<br/> successful";
			$_SESSION["name"]=$rows->first_name." ".$rows->last_name;
			redirect("index.php","<br/>Congrat, you have logged in succcessfully!");
		}
		else
		{
			//echo "<br/> fail";
			$error_msg="Invalid Password!";
			redirect("login.php",$error_msg);
		}
	}
}
?>
	
