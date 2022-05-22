<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include('connect.php');

$uID = $obj['UserID'];
$from = $obj['fromTime']; 
$to = $obj['toTime']; 
$from2 = $obj['fromTime2']; 
$to2 = $obj['toTime2']; 
$currNew = true;


        $updateQuerry = "UPDATE slidescaleinterval SET fromTime='$from2', toTime='$to2'  WHERE UserID='$uID' AND fromTime='$from' AND toTime='$to' ";
       

    if ($conn->query($updateQuerry) === TRUE) {
        $Message2 = "Record updated successfully";
      } else {
        $Message2 = "Error updating record: ";
      }




      $response[] = array("Message" => $Message2);

      echo json_encode($response);
       