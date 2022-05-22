<?php
include('connect.php');

$id = $obj['UserID'];
$from = $obj['fromTime'];
$to = $obj['toTime'];
$icr = $obj['ICR'];
$currOld = false;
$updateQuerry = "UPDATE icrinterval SET current='$currOld' WHERE UserID='$id' AND fromTime='$from' AND toTime='$to' AND ICR='$icr'";
if ($conn->query($updateQuerry) === TRUE) {
    $Message = 'Success';
} else {
  $Message = 'Error';
}
$response[] = array("Message" => $Message);

echo json_encode($response);
