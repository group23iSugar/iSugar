<?php
include('connect.php');

$uID = $obj['UserID'];
$flag = "false";
$userID='';
$bglevel = '';

$selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
$selectQuerry1 -> bind_param("i", $uID); 
$selectQuerry1 -> execute();

        if ($selectQuerry1->get_result()) {
              $selectQuerry2 = $conn -> prepare("SELECT * FROM bglevel WHERE UserID = ? AND BGLevelDate >= now() - INTERVAL 2 DAY AND BGLevel < 50");
              $selectQuerry2 -> bind_param("i", $uID); 
              $selectQuerry2 -> execute();
              $result2 = $selectQuerry2->get_result(); // get the mysqli result
              $Row = $result2->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $bglevel = $Row["BGLevel"];
              $flag = "true";
       }
         else {
            $flag = "False";
        }
$response[] = array("flag"=> $flag, "userID"=> $userID, "bglevel"=> $bglevel);

echo json_encode($response);

