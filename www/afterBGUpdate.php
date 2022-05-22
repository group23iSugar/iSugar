<?php
include('connect.php');

  $uID = $obj['UserID'];
  $from = $obj['fromTime']; 
  $to = $obj['toTime']; 
  $bgF = $obj['fromBGLevel'];
  $bgT = $obj['toBGLevel'];
  $insulin = $obj['insulinDose'];
  $currOld = false;
  $currNew = true;

$selectQuerry = "SELECT ssID FROM slidescaleinterval WHERE UserID='$uID' AND  fromTime='$from' AND toTime='$to' ";
$result = $conn->query($selectQuerry);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $ssID = $row['ssID'];
}
$InsertQuerry2 = "INSERT INTO  bgleveltoinsulin (ssID, fromBGLevel, toBGLevel, insulinDose, current, AdditionDate) VALUES('$ssID', '$bgF', '$bgT', '$insulin', '$currNew', now())";

    $R2 = mysqli_query($conn, $InsertQuerry2);

    if ($R2) {
        $Message2 = "insert 2 Success";
    } else {
        $Message2 = "insert 2 Error";
    }
       
      $response[] = array("Message" => $Message2);

      echo json_encode($response);
       