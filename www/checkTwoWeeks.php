<?php
include('connect.php');

$uID = $obj['UserID'];
$curDate = $obj['currDate'];
$m = $obj['Month'];
$d = $obj['Day'];
$y = $obj['Year'];
$userDate = date("$y-$m-$d");
$flag = "false";
   // Function call to find date difference
   $dateDiff = dateDiffInDays($userDate, $curDate);
   

  function dateDiffInDays($date1, $date2) 
  {
      // Calculating the difference in timestamps
      $diff = strtotime($date2) - strtotime($date1);
      // 1 day = 24 hours
      // 24 * 60 * 60 = 86400 seconds
      return abs(round($diff / 86400));
  }

     if ($dateDiff < 14){//14 days == 2 weeks
      $flag = "true";
     }

$response[] = array("flag"=> $flag);

echo json_encode($response);

