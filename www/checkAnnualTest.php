<?php
include('connect.php');

$uID = $obj['UserID'];
$flag = "false";
$userID='';
$findings = '';
$EvidenceOfRetinopathy = '';

$selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
$selectQuerry1 -> bind_param("i", $uID); 
$selectQuerry1 -> execute();

        if ($selectQuerry1->get_result()) {
              $selectQuerry2 = $conn -> prepare("SELECT * FROM annualtest WHERE UserID = ? AND Finding = ?");
              $selectQuerry2 -> bind_param("ii", $uID, $findings); 
              $selectQuerry2 -> execute();
              $result2 = $selectQuerry2->get_result(); // get the mysqli result
              $Row = $result2->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $EvidenceOfRetinopathy = $Row["Finding"];
              $flag = "true";
       }
         else {
            $flag = "False";
        }
$response[] = array("flag"=> $flag, "userID"=> $userID, "EvidenceOfRetinopathy"=> $EvidenceOfRetinopathy);

echo json_encode($response);

