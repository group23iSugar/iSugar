<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
$flag = "false";
$cur = 1;
$userID='';
$ssID = '';
$fromTime= '';
$toTime= '';

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
        $flag= "false";
    }

if($flag == "true"){
    $selectQuerry1 = $conn -> prepare("SELECT * FROM slidescaleinterval WHERE UserID = ? AND current = ?");
    $selectQuerry1 -> bind_param("ii", $uID, $cur); 
    $selectQuerry1 -> execute();
    $result1 = $selectQuerry1->get_result(); // get the mysqli result
    $datas = $result1->fetch_all(MYSQLI_ASSOC);
      $count = 0;
      foreach ($datas as $data){
        $userID = $data["UserID"];
        $ssID = $data["ssID"];
        $fromTime = $data["fromTime"];
        $toTime = $data["toTime"];
        $count = $count+1;
        $response1[] = array("userID"=> $userID, "ssID"=> $ssID, "fromTime"=> $fromTime, "toTime"=> $toTime);
        $counter[] = array($ssID);
}
      
$response = array(
    $count,
    $counter,
    $response1
);
echo json_encode($response);
}

