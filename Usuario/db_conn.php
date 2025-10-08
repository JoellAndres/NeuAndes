<?php

$sname = "localhost";
$unmae = "root";
$db_name = "lab"; 

$conn = mysqli_connect($sname, $unmae, "", $db_name);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>

