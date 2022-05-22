<?php
include('connect.php');

$uID = $obj['UserID'];
$timeString = $obj['Date_Time'];
$glucaFlag = $obj['GlucagonFlag'];
$hBGlevel = $obj['BGlevel'];
$hypoReason = $obj['Reason'];
$hypoReasonText = $obj['Other'];

$InsertQuerry = $conn -> prepare("INSERT INTO  hypoglycemiarecords (UserID, Date_Time, GlucagonFlag, BGlevel, Reason, Other) VALUES(?, ?, ?, ?, ?, ?)");
$InsertQuerry -> bind_param("isiiss", $uID, $timeString, $glucaFlag, $hBGlevel, $hypoReason, $hypoReasonText); 
$InsertQuerry -> execute();

if ($InsertQuerry->affected_rows==1) {
$Message = "Success";
} else {
$Message = "ERROR";
}

$response[] = array("Message" => $Message);

echo json_encode($response);
