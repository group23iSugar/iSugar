<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
$cur = 1;
$flag = "false";
$userID='';
$insulinType= '';
$iDose= '';
$iTime= '';
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
            $selectQuerry1 = $conn -> prepare("SELECT * FROM insulin_other WHERE UserID = ? AND current = ?");
            $selectQuerry1 -> bind_param("ii", $uID, $cur); 
            $selectQuerry1 -> execute();
            $result1 = $selectQuerry1->get_result(); // get the mysqli result
            $Row = $result1->fetch_assoc(); // fetch data   
            $userID = $Row["UserID"];
            $insulinType = $Row["insulinType"];
            $iDose = $Row["iDose"];
            $iTime = $Row["iTime"];
        }
$response[] = array("userID"=> $userID, "insulinType"=> $insulinType, "iDose"=> $iDose, "iTime"=> $iTime);

echo json_encode($response);

