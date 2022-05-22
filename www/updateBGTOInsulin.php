<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include('connect.php');

  $uID = $obj['UserID'];
  $from = $obj['fromTime']; 
  $to = $obj['toTime']; 
  $bgF = $obj['fromBGLevel'];
  $bgT = $obj['toBGLevel'];
  $insulin = $obj['insulinDose'];
  $bgF1 = $obj['fromBGLevel1'];
  $bgT1 = $obj['toBGLevel1'];
  $insulin1 = $obj['insulinDose1'];
  $currOld = false;
  $currNew = true;

$selectQuerry = "SELECT ssID FROM slidescaleinterval WHERE UserID='$uID' AND  fromTime='$from' AND toTime='$to' ";
$result = $conn->query($selectQuerry);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $ssID = $row['ssID'];
}
$updateQuerry2 = "UPDATE bgleveltoinsulin SET fromBGLevel='$bgF1', toBGLevel='$bgT1', insulinDose='$insulin1'  WHERE ssID='$ssID' AND fromBGLevel='$bgF' AND toBGLevel='$bgT' AND insulinDose='$insulin' ";
if ($conn->query($updateQuerry2) === TRUE) {
  $Message3 = " Record updated successfully";
} else {
  $Message3 = " Error updating record: ";
}


       
      $response[] = array("Message" => $Message3);

      echo json_encode($response);
       