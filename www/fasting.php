<?php
include('connect.php');

$uID = $obj['UserID'];
$timeString = $obj['failDate'];
$start = $obj['startingDose'];

$InsertQuerry = $conn -> prepare("INSERT INTO  fasting (UserID, recordDate, profilEntry) VALUES(?, ?, ?)");
$InsertQuerry -> bind_param("isi", $uID, $timeString, $start); 
$InsertQuerry -> execute();

if ($InsertQuerry->affected_rows==1) {
$Message = "Success";
} else {
$Message = "ERROR";
}

$response[] = array("Message" => $Message);

echo json_encode($response);
