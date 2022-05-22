<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
$flag = "false";
$cur = 1;
$userID='';
$insulinType= '';
$halfOrFull= '';

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
            $selectQuerry1 = $conn -> prepare("SELECT * FROM insulin_pen WHERE UserID = ? AND current = ?");
            $selectQuerry1 -> bind_param("ii", $uID, $cur); 
            $selectQuerry1 -> execute();
            $result1 = $selectQuerry1->get_result(); // get the mysqli result
            $Row = $result1->fetch_assoc(); // fetch data   
                $userID = $Row["UserID"];
                $insulinType = $Row["insulinType"];
                $halfOrFull = $Row["halfOrFull"];
        }
$response[] = array("userID"=> $userID, "insulinType"=> $insulinType, "halfOrFull"=> $halfOrFull);

echo json_encode($response);

