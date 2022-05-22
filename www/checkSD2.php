<?php
include('connect.php');

$uID = $obj['UserID'];
$curDate = $obj['curDate'];
$flag = "false";
$userID='';
$bgLevel = '';
$bgLevelDate = '';
$bglevelTime = '';
$lastTwoWeeks = date('Y-m-d', strtotime('-14 day'));

    $selectQuerry = "SELECT * FROM useraccount WHERE UserID='$uID'";
    $R = mysqli_query($conn, $selectQuerry);

  if ($R) {
    $selectQuerry2 =  "SELECT * FROM bglevel WHERE UserID = '$uID' AND BGLevelDate between '$lastTwoWeeks' and '$curDate' Order by BGLevelDate ASC";
    $R2 = mysqli_query($conn, $selectQuerry2);
    $count = mysqli_num_rows($R2);
    if($count == 0){
      $flag = 'false';
    }
    else {
      while($row = mysqli_fetch_array($R2)){
        $userID = $row['UserID'];
        $bgLevel = $row['BGLevel'];
        $bgLevelDate = $row['BGLevelDate'];
        $bglevelTime = $row['BGLevelTime'];
        $flag = 'true';
        $response[] = array("flag"=> $flag, "userID"=> $userID, "bgLevel"=> $bgLevel, "bgLevelDate"=> $bgLevelDate);
      }
      
    }
  }
echo json_encode($response);

