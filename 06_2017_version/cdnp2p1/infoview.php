<?php
function redirect($URLaddr,$hintWord)
{
	$_SESSION["hintword"]=$hintWord;
	header("Location: $URLaddr");
	die;
}
require_once("top.php");
if(isset($_SESSION["name"]))
{
?>
	<h2>Your customer information</h2>
	<table>
	<tr><th>Customer Name</th><th>Network Traffic</th></tr>
<?php
 	$db=new PDO("mysql:dbname=login_demo","admin001","1963xjb");
	$name=explode(" ",$_SESSION["name"]);
	list($first_name,$last_name)=$name;
	$stmt=$db->prepare("select uo.operator1 AS uo_name, uo.networktraffic1 AS uo_flow
	FROM user_info uf JOIN user_operator uo ON uf.user_id=uo.user_id WHERE
	uf.first_name=:first_name AND uf.last_name=:last_name");
	$stmt->bindParam(":first_name",$first_name,PDO::PARAM_STR);
	$stmt->bindParam(":last_name",$last_name,PDO::PARAM_STR);
	$stmt->execute();
	$rows=$stmt->fetchAll();
	//echo count($rows);
	foreach($rows as $row)
	{
?>	
	<tr>
		<td><?= $row['uo_name'] ?></td>
		<td><?= $row['uo_flow'] ?></td>
	</tr>
<?php
	}
?>
	</table>
<?php
	require_once('bottom.php');	
}
else
{
redirect("index.php","Please log in before you view the information!");
}
?>