<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
$tID = $obj['takenInslin'];
$flag = "false";
$cur = 1;
$takenInsulinID='';
$typeEx= '';
$duration= 0;
$timeEX= '';
$selectQuerry = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
    $selectQuerry -> bind_param("i", $uID); 
    $selectQuerry -> execute();
    $result = $selectQuerry->get_result(); // get the mysqli result
    $Row = $result->fetch_assoc(); // fetch data   
        $Email = $Row['email'];
        $password =  $Row['pass'];
        
        if ($mail == $Email && $uPass == $password){
            $flag = "true";

        } else {
            $flag="false";
        }

        if($flag == "true"){
                $selectQuerry1 = $conn -> prepare("SELECT * FROM previousexercise WHERE takenInsulinID = ? AND current = ?");
                $selectQuerry1 -> bind_param("ii", $tID, $cur); 
                $selectQuerry1 -> execute();
                $result1 = $selectQuerry1->get_result(); // get the mysqli result
                $Row = $result1->fetch_assoc(); // fetch data   
                $takenInsulinID = $Row["takenInsulinID"];
                $typeEx = $Row["typeEx"];
                $duration = $Row["duration"];
                $timeEX = $Row["timeEX"];
        }

        $response[] = array("takenInsulinID"=> $takenInsulinID, "typeEx"=> $typeEx, "duration"=> $duration, "timeEX"=> $timeEX);

echo json_encode($response);

