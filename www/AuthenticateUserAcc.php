<?php
include('connect.php');

$mail = $obj["email"];//هذا اللي من اليوزر 
$uPass = md5($obj["pass"]);
$userID = "";
$firstName = "";
$lastName = "";
$emailUser = "";
$userAccType = "";
$flag = "false";

    $selectQuerry = $conn -> prepare("SELECT * FROM useraccount WHERE email = ?");
    $selectQuerry -> bind_param("s", $mail); 
    $selectQuerry -> execute();
    $result = $selectQuerry->get_result(); // get the mysqli result
    $Row = $result->fetch_assoc(); // fetch data   

        $Email = $Row['email'];//هذا اللي من الداتابيس
        $password =  $Row['pass'];//هذا اللي من الداتابيس
        
        if ($mail == $Email && $uPass == $password){
            $flag = "true";

        } else {
            $flag="false";
        }

    if ($flag == "true") {
        $selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE email = ?");
        $selectQuerry1 -> bind_param("s", $mail); 
        $selectQuerry1 -> execute();
        $result = $selectQuerry1->get_result(); // get the mysqli result
        $Row = $result->fetch_assoc(); // fetch data   
        $userID = $Row["UserID"];
        $firstName = $Row["firstname"];
        $lastName = $Row["lastname"];
        $emailUser = $Row["email"];
        $userAccType = $Row["accountType"];
} 

$response[] = array("flag"=> $flag, "userID"=> $userID, "firstName" => $firstName, "lastName" => $lastName, "userAccType" => $userAccType);


echo json_encode($response);
