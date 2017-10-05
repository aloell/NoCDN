<?php
function req($formVar,&$errorMsg)
{
	if(!isset($formVar)||strlen($formVar)===0)
	{
		$errorMsg="$formVar cannot be blank. Please fill it!";
		return false;
	}
	else
	{
		return true;
	}
}
function validatorEmail($email,&$errorMsg)
{
	if(preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i",
	 $email))
	{
		return true;
	}
	else
	{
		$errorMsg="The email you entered is invalid!";
		return false;
	}
}
function insertIntoDB($formVar,&$erroMsg)
{
	try{
	$db=new PDO("mysql:dbname=myxdns","root","123456");
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt=$db->prepare("INSERT INTO user_info(first_name,last_name,email,password,ip_address) 
	VALUES(:first_name,:last_name,:email,:password,:ip_address)");
	//print_r($formVar);
	$stmt->execute(array(":first_name"=>$formVar["first_name"],
	":last_name"=>$formVar["last_name"],
	":email"=>$formVar["email"],
	":password"=>$formVar["password"]
	":ip_address"=>$_SERVER["REMOTE_ADDR"]));
	$stmt=$db->prepare("INSERT INTO rr(zone,name,type,data) values(:zone,:name,:type,:data)");
	$stmt-execute(array(":zone"=>1,
	":name"=>"www.cnn.com.",
	":type"=>"A",
	":data"=>$_SERVER["REMOTE_ADDR"]));
	return TRUE;
	}
	catch(PDOException $ex)
	{
		$erroMsg=$ex->getMessage();
		//print($erroMsg);
		return FALSE;
	}
}
function registerUser(&$erro_msg)
{
	$submitted_pw=md5($_POST["password"]);
	$_POST["password"]=$submitted_pw;
	$erro_msg="";
	//print_r($_POST);
	foreach($_POST as $testVar)
	{
		if(!req($testVar,$erro_msg))
		{
			echo "<br/>".$erro_msg;
			return FALSE;
		}	
	}
	if(!validatorEmail($_POST["email"],$erro_msg))
	{
		echo "<br/>".$erro_msg;
		return FALSE;
	}	
	if(!insertIntoDB($_POST,$erro_msg))
	{
		echo "<br/>".$erro_msg;
		return FALSE;
	}
	return TRUE;
}

?>

    
		
