<?php
include('connect.php');

$uID = $obj['UserID'];
//$BGDate = $obj['BGlevelDate'];
$flag = "false";
$userID='';
$cur = '1';
$dose = '';
$hours = '';

    $selectQuerry = "SELECT * FROM useraccount WHERE UserID='$uID'";

    $R = mysqli_query($conn, $selectQuerry);

  if ($R) {
    $selectQuerry2 =  "SELECT * FROM takeninsulindose WHERE UserID = '$uID' AND current = '$cur'";
    $R2 = mysqli_query($conn, $selectQuerry2);
    if (mysqli_num_rows($R2) > 0) {
      $Row =mysqli_fetch_assoc($R2);
   $userID = $Row["UserID"];
   $dose = $Row["insulinDose"];
   $hours = $Row["Dose_time_hours"];
   $flag = "true";
}
 else {
    $flag = "False";
}

  }

$response[] = array("flag"=> $flag, "userID"=> $userID, "dose"=> $dose, "hours"=> $hours);

echo json_encode($response);

