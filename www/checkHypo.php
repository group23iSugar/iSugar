<?php
include('connect.php');

$uID = $obj['UserID'];
//$BGDate = $obj['BGlevelDate'];
$search = "true";
$flag = "false";
$flag2 = "false";
$userID='';
$bglevel = '';
$BGLevelDate = '';
$userID2='';
$bglevel2 = '';
$BGLevelDate2 = '';

$selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
$selectQuerry1 -> bind_param("i", $uID); 
$selectQuerry1 -> execute();
while ($search == "true") {
  if ($selectQuerry1->get_result()) {
      $selectQuerry2 = $conn -> prepare("SELECT * FROM bglevel WHERE UserID = ? AND BGLevel < 70");
      $selectQuerry2 -> bind_param("i", $uID); 
      $selectQuerry2 -> execute();
      $result2 = $selectQuerry2->get_result(); // get the mysqli result
      $Row = $result2->fetch_assoc(); // fetch data   
      $userID = $Row["UserID"];
      $bglevel = $Row["BGLevel"];
      $BGLevelDate = $Row["BGLevelDate"];
      $flag = "true";
}
 else {
    $flag = "False";
}

if ($flag == "true"){
    $selectQuerry2 = $conn -> prepare("SELECT * FROM bglevel WHERE UserID = ? AND BGLevel < 70 AND BGLevelDate >= ? + INTERVAL 1 DAY");
    $selectQuerry2 -> bind_param("is", $uID, $BGLevelDate); 
    $selectQuerry2 -> execute();
    $result2 = $selectQuerry2->get_result(); // get the mysqli result
    $Row = $result2->fetch_assoc(); // fetch data   
    $userID2 = $Row["UserID"];
    $bglevel2 = $Row["BGLevel"];
    $BGLevelDate2 = $Row["BGLevelDate"];
 $flag2 = "true";
}
else {
 $flag2 = "False";
}
if ( $flag == "true" &&  $flag2 == "true"){
  $search = "false";
}
}   
$response[] = array("flag"=> $flag, "userID"=> $userID, "bglevel"=> $bglevel, "BGLevelDate"=> $BGLevelDate, "flag2"=> $flag2, "userID2"=> $userID2, "bglevel2"=> $bglevel2, "BGLevelDate2"=> $BGLevelDate2);

echo json_encode($response);

