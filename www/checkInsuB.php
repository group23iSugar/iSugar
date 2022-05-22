<?php
include('connect.php');

$uID = $obj['UserID'];
//$BGDate = $obj['BGlevelDate'];
$flag = "false";
$flag2 = "false";
$userID='';
$cur = '1';
$insulinReg = '';
$isfInterval = '';
$isf = '';
$startBG = '';
$targetBG = '';
$insulinType = '';


    $selectQuerry = "SELECT * FROM useraccount WHERE UserID='$uID'";

    $R = mysqli_query($conn, $selectQuerry);

  if ($R) {
    $selectQuerry2 =  "SELECT * FROM insulin_regimen WHERE UserID = '$uID' AND current = '$cur' order by AdditionDate DESC" ;
    $selectQuerry3 =  "SELECT * FROM isfintervals WHERE UserID = '$uID' AND current = '$cur' order by AdditionDate DESC" ;
    
    $R2 = mysqli_query($conn, $selectQuerry2);
    if (mysqli_num_rows($R2) > 0) {
      $Row =mysqli_fetch_assoc($R2);
   $userID = $Row["UserID"];
   $insulinReg = $Row["insulinRegimen"];
   $flag = "true";
   if ($insulinReg == 'Pen' || $insulinReg == 'pen'){
    $selectQuerrys =  "SELECT * FROM insulin_pen WHERE UserID = '$uID' AND current = '$cur' order by AdditionDate DESC" ;
    $R0 = mysqli_query($conn, $selectQuerrys);
    if (mysqli_num_rows($R0) > 0) {
      $Row =mysqli_fetch_assoc($R0);
   $userID = $Row["UserID"];
   $insulinType = $Row["insulinType"];
    }
   }
}
 else {
    $flag = "False";
}

$R3 = mysqli_query($conn, $selectQuerry3);
if (mysqli_num_rows($R3) > 0) {
  $Row =mysqli_fetch_assoc($R3);
$userID = $Row["UserID"];
$isfInterval = $Row["ISFInter"];
if ($isfInterval == '0'){
  $flag2 = "true";
  $selectQuerry4 =  "SELECT * FROM isf WHERE UserID = '$uID' AND current = '$cur' order by AdditionDate DESC" ;
  $selectQuerry5 =  "SELECT * FROM startbg_correct WHERE UserID = '$uID' AND current = '$cur' order by AdditionDate DESC" ;
  $selectQuerry6 =  "SELECT * FROM targetbg_correct WHERE UserID = '$uID' AND current = '$cur' order by AdditionDate DESC" ;

  $R4 = mysqli_query($conn, $selectQuerry4);
  if (mysqli_num_rows($R4) > 0) {
    $Row =mysqli_fetch_assoc($R4);
 $userID = $Row["UserID"];
 $isf = $Row["ISF"];
}
$R5 = mysqli_query($conn, $selectQuerry5);
if (mysqli_num_rows($R5) > 0) {
  $Row =mysqli_fetch_assoc($R5);
$userID = $Row["UserID"];
$startBG = $Row["startBG"];
}
$R6 = mysqli_query($conn, $selectQuerry6);
if (mysqli_num_rows($R6) > 0) {
  $Row =mysqli_fetch_assoc($R6);
$userID = $Row["UserID"];
$targetBG = $Row["targetBG"];
}
}
}
else {
$flag2 = "False";
}
  }

$response[] = array("flag"=> $flag, "userID"=> $userID, "insulinReg"=> $insulinReg, "flag2"=> $flag2, "userID"=> $userID, "isfInterval"=> $isfInterval, "isf"=> $isf, "startBG"=> $startBG, "targetBG"=> $targetBG, "insulinType"=> $insulinType);

echo json_encode($response);

