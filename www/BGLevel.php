<?php
include('connect.php');

$uID = $obj['UserID'];
$bglevel = $obj['BGLevel'];
$curDate = $obj['BGLevelDate'];
$curTime = $obj['BGLevelTime'];

$InsertQuerry = $conn -> prepare("INSERT INTO  bglevel (UserID, BGLevel, BGLevelDate, BGLevelTime) VALUES(?, ?, ?, ?)");
$InsertQuerry -> bind_param("iiss", $uID, $bglevel, $curDate, $curTime); 
$InsertQuerry -> execute();

if ($InsertQuerry->affected_rows==1) {
$Message = "Success";
} else {
$Message = "ERROR";
}

$response[] = array("Message" => $Message);

echo json_encode($response);