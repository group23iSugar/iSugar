<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include('connect.php');

$idICR = $obj['icrID'];
$uID = $obj['UserID'];
$from = $obj['fromTime'];
$to  = $obj['toTime'];
$icr = $obj['ICR'];
$currOld = false;
$currNew = true;

    
        $updateQuerry = "UPDATE icrinterval SET current='$currOld' WHERE icrID='$idICR'";
        $InsertQuerry = "INSERT INTO  icrinterval  (UserID, fromTime, toTime, ICR,  current, AdditionDate) VALUES('$uID', '$from', '$to', '$icr','$currNew', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($conn->query($updateQuerry) === TRUE) {
        echo "Record updated successfully";
      } else {
        echo "Error updating record: " . $conn->error;
      }




 