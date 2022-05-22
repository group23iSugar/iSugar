<?php
include('connect.php');

$id = $obj['UserID'];
$currOld = false;
$updateQuerry = "UPDATE insulin_pen SET current='$currOld' WHERE UserID='$id'";
if ($conn->query($updateQuerry) === TRUE) {
    $Message = 'Success';
} else {
  $Message = 'Error';
}

$response[] = array("Message" => $Message);

echo json_encode($response);