<?php
/*echo isset($_SESSION);
print_r($_SESSION);
echo session_id();
echo "seperate line!";*/
session_start();
echo session_id();
$_SESSION["name"]="junbo";
session_destroy();
echo session_id();
print_r($_SESSION);
?>