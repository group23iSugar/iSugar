<?php
include('connect.php');

$id = $obj['UserID'];
$oldinsulinT = $obj['insulinType'];
$olddose = $obj['halfOrFull'];
$currOld = false;
$updateQuerry = "UPDATE insulin_pen SET current='$currOld' WHERE UserID='$id' AND halfOrFull='$olddose' AND insulinType='$oldinsulinT'";
if ($conn->query($updateQuerry) === TRUE) {
    $Message = 'Success';
} else {
  $Message = 'Error';
}
$response[] = array("Message" => $Message);

echo json_encode($response);