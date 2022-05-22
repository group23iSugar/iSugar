<?php
include('connect.php');

$uID = $obj['UserID'];
$flag = "false";
$userID='';
$Date= '';
$Time='';
$type='';
$selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
$selectQuerry1 -> bind_param("i", $uID); 
$selectQuerry1 -> execute();

  if ($selectQuerry1->get_result()) {
              $selectQuerry2 = $conn -> prepare("SELECT * FROM exerciserecord WHERE UserID = ? AND recordDate = CURDATE()");
              $selectQuerry2 -> bind_param("i", $uID); 
              $selectQuerry2 -> execute();
              $result2 = $selectQuerry2->get_result(); // get the mysqli result
              $Row = $result2->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $Date = $Row["recordDate"];
              $Time = $Row["recordTime"];
              $type = $Row["exerciseType"];
              $flag = "true";
       }
         else {
            $flag = "False";
        }
      
$response[] = array("flag"=> $flag, "userID"=> $userID, "Date"=> $Date, "Time"=> $Time, "type"=> $type);

echo json_encode($response);

