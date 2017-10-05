<?php
    if(isset($_GET['bytes']))
    {
      //echo "hello world<br/>";
      $records="";
      if(file_exists("byteCount.txt"))
      {
        $records=file_get_contents("byteCount.txt");
      }
      $current=time();
      $records=$records."\ntime: ".$current." ".$_GET['bytes'];
      //echo $records;
      file_put_contents("byteCount.txt",$records);
    }
?>
