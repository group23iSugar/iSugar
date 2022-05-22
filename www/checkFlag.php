<?php
include('connect.php');

$uID = $obj['UserID'];
$flag = "false";
$userID='';
$msgFlag = '';
$msgFalgDate='';

 $selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
 $selectQuerry1 -> bind_param("i", $uID); 
 $selectQuerry1 -> execute();

  if ($selectQuerry1->get_result()) {
   $selectQuerry2 = $conn -> prepare("SELECT * FROM flags WHERE UserID = ? ORDER by eMsgFlagDate DESC");
   $selectQuerry2 -> bind_param("i", $uID); 
   $selectQuerry2 -> execute();
   $result2 = $selectQuerry2->get_result(); // get the mysqli result
   $Row = $result2->fetch_assoc(); // fetch data   
    $userID = $Row["UserID"];
    $msgFlag = $Row["eMsgFlag"];
    $msgFalgDate = $Row["eMsgFlagDate"];
    $flag = "true";
    }
    else {
     $flag = "False";
    }
$response[] = array("flag"=> $flag,  "userID"=> $userID, "msgFlag"=> $msgFlag, "msgFalgDate"=> $msgFalgDate);

echo json_encode($response);

