<?php
include('connect.php');

$uID = $obj['UserID'];
$msgFlag = $obj['eMsgFlag'];
$FalgDate = $obj['eMsgFlagDate'];

$InsertQuerry = $conn -> prepare("INSERT INTO  flags (UserID, eMsgFlag, eMsgFlagDate) VALUES(?, ?, ?)");
$InsertQuerry -> bind_param("iis", $uID, $msgFlag, $FalgDate); 
$InsertQuerry -> execute();


if ($InsertQuerry->affected_rows==1 ) {
$Message = "Success";
} else {
$Message = "ERROR";
}

$response[] = array("Message" => $Message);

echo json_encode($response);