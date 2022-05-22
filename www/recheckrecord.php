<?php
include('connect.php');

$uID = $obj['UserID'];
$curDate = $obj['recordDate'];
$curTime = $obj['recordTime'];
$type = $obj['exerciseType'];
$CorrectionDose = $obj['suggestedCorrectionDose'];
$ketonesSource =  $obj['ketonesSource'];
$ketonesLevel =  $obj['ketonesLevel'];
$suggestedCarbs = $obj['suggestCarbs'];

$InsertQuerry = $conn -> prepare("INSERT INTO  exerciserecord (UserID, recordDate, recordTime, exerciseType, suggestedCorrectionDose, ketonesSource, ketonesLevel, suggestCarbs) VALUES(?, ?, ?, ?, ?, ?, ?, ?)");
$InsertQuerry -> bind_param("isssisss", $uID, $curDate, $curTime, $type, $CorrectionDose, $ketonesSource, $ketonesLevel, $suggestedCarbs); 
$InsertQuerry -> execute();

if ($InsertQuerry->affected_rows==1) {
$Message = "Success";
} else {
$Message = "ERROR";
}

$response[] = array("Message" => $Message);

echo json_encode($response);