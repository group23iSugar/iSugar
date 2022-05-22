<?php
include('connect.php');

$uID = $obj['UserID'];
$appointmentDate = $obj['appointmentDate'];
$note = $obj['note'];

$InsertQuerry = $conn -> prepare("INSERT INTO  appointments (UserID, appointmentDate, note) VALUES(?, ?, ?)");
$InsertQuerry -> bind_param("iss", $uID, $appointmentDate, $note); 
$InsertQuerry -> execute();

if ($InsertQuerry->affected_rows==1) {
$Message = "Success";
} else {
$Message = "ERROR";
}

$response[] = array("Message" => $Message);

echo json_encode($response);
