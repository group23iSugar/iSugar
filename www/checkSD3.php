<?php
include('connect.php');

$uID = $obj['UserID'];
$flag = "false";
$userID='';
$cur = '1';
$insulinReg = '';
$insulinCal = '';
  
$selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
$selectQuerry1 -> bind_param("i", $uID); 
$selectQuerry1 -> execute();

  if ($selectQuerry1->get_result()) {
    // $selectQuerry2 =  "SELECT * FROM weigthkg WHERE UserID = '$uID' AND current = '$cur' ORDER BY AdditionDate DESC";
    $selectQuerry2 = $conn -> prepare("SELECT * FROM insulin_regimen WHERE UserID = ? AND current = ? ORDER BY AdditionDate DESC");
    $selectQuerry2 -> bind_param("ii", $uID, $cur); 
    $selectQuerry2 -> execute();
    $result2 = $selectQuerry2->get_result(); // get the mysqli result
    $Row = $result2->fetch_assoc(); // fetch data   
    $userID = $Row["UserID"];
    $insulinReg = $Row["insulinRegimen"];

    // $selectQuerry3 =  "SELECT * FROM dob WHERE UserID = '$uID' AND current = '$cur' ORDER BY AdditionDate DESC";
    $selectQuerry3 = $conn -> prepare("SELECT * FROM insulincalcmethod WHERE UserID = ? AND current = ? ORDER BY AdditionDate DESC");
    $selectQuerry3 -> bind_param("ii", $uID, $cur); 
    $selectQuerry3 -> execute();
    $result3 = $selectQuerry3->get_result(); // get the mysqli result
    $Row = $result3->fetch_assoc(); // fetch data   
    $userID = $Row["UserID"];
    $insulinCal = $Row["insulinCalc"];
    $flag = "true";
  }
   else {
      $flag = "False";
  }

$response[] = array("flag"=> $flag, "userID"=> $userID, "insulinReg"=> $insulinReg, "insulinCal"=> $insulinCal);

echo json_encode($response);

