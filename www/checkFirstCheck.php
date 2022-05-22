<?php
include('connect.php');

$uID = $obj['UserID'];
$curDate = $obj['curDate'];//current date 
$curTime = $obj['curTime'];//cureent time
$flag = "false";
$beforeTwoHour = "";
$userID='';
$cur = '1';
$sickDayDate = '';
$sickDayTime = '';
$lessThanTwoHour = "false";
$takeExtraInsulin = '';
$dateDiff = '';
      
$selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
$selectQuerry1 -> bind_param("i", $uID); 
$selectQuerry1 -> execute();

  if ($selectQuerry1->get_result()) {
      $selectQuerry2 = $conn -> prepare("SELECT * FROM rechecksickday WHERE UserID = ? AND RecheckDate = ? ORDER BY RecheckTime DESC");
      $selectQuerry2 -> bind_param("is", $uID, $curDate); 
      $selectQuerry2 -> execute();
      $result2 = $selectQuerry2->get_result(); // get the mysqli result
      $Row = $result2->fetch_assoc(); // fetch data   

   $userID = $Row["UserID"];
   $sickDayDate = $Row["RecheckDate"];
   $sickDayTime = $Row["RecheckTime"];
   $takeExtraInsulin = $Row["takeExtraInsulin"];

   $flag = "true";
  // Function call to find time difference
  $dateDiff = timeDiff($sickDayTime, $curTime);
}
 else {
    $flag = "False";
}
  

  function timeDiff($time1, $time2) 
  {
      // Calculating the difference in timestamps
      $diff = strtotime($time2) - strtotime($time1);
  
      // 2 * 60 * 60 = 7200 seconds
      return abs(round($diff / 7200));
  }
 

     if ($dateDiff < 2){//if less than two hours
      $lessThanTwoHour = "true";
     } else { 
      $lessThanTwoHour = "false";
     }

$response[] = array("flag"=> $flag, "userID"=> $userID, "sickDayTime"=> $sickDayTime, "lessThanTwoHour"=> $lessThanTwoHour, "takeExtraInsulin"=> $takeExtraInsulin);

echo json_encode($response);

