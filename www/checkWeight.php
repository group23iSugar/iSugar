<?php
include('connect.php');

$uID = $obj['UserID'];
$flag = "false";
$cur = 1;
$userID='';
$weight_KG= 0;

$selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
$selectQuerry1 -> bind_param("i", $uID); 
$selectQuerry1 -> execute();

 if ($selectQuerry1->get_result()) {
              $selectQuerry2 = $conn -> prepare("SELECT * FROM weigthkg WHERE UserID= ? AND current= ?");
              $selectQuerry2 -> bind_param("ii", $uID, $cur); 
              $selectQuerry2 -> execute();
              $result2 = $selectQuerry2->get_result(); // get the mysqli result
              $Row = $result2->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $weight_KG = $Row["weight_KG"];
              $flag = "true";
       }
         else {
            $flag = "False";
        }
$response[] = array("flag"=> $flag,  "userID"=> $userID, "weight_KG"=> $weight_KG);

echo json_encode($response);

