<?php
include('connect.php');

$uID = $obj['UserID'];
$flag = "false";
$userID='';
$cur = '1';
$insulinReg = '';
$insulinType = '';
$insulinTypeOther = '';
$insulinPen = '';

$selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
$selectQuerry1 -> bind_param("i", $uID); 
$selectQuerry1 -> execute();

  if ($selectQuerry1->get_result()) {
      $selectQuerry2 = $conn -> prepare("SELECT * FROM insulin_regimen WHERE UserID = ? AND current = ? ORDER BY AdditionDate DESC");
      $selectQuerry2 -> bind_param("ii", $uID, $cur); 
      $selectQuerry2 -> execute();
      $result2 = $selectQuerry2->get_result(); // get the mysqli result
      $Row = $result2->fetch_assoc(); // fetch data   
      $userID = $Row["UserID"];
      $insulinReg = $Row["insulinRegimen"];
      $flag = "true";
    }
    else {
        $flag = "False";
    }

if ($insulinReg == 'Pen' || $insulinReg == 'pen'){
      $selectQuerry3 = $conn -> prepare("SELECT * FROM insulin_pen WHERE UserID = ? AND current = ? ORDER BY AdditionDate DESC");
      $selectQuerry3 -> bind_param("ii", $uID, $cur); 
      $selectQuerry3 -> execute();
      $result3 = $selectQuerry3->get_result(); // get the mysqli result
      $Row = $result3->fetch_assoc(); // fetch data   
      $userID = $Row["UserID"];
      $insulinType = $Row["insulinType"];

    $selectQuerry4 = $conn -> prepare("SELECT * FROM insulin_other WHERE UserID = ? AND current = ? ORDER BY AdditionDate DESC");
      $selectQuerry4 -> bind_param("ii", $uID, $cur); 
      $selectQuerry4 -> execute();
      $result4 = $selectQuerry4->get_result(); // get the mysqli result
      $Row = $result4->fetch_assoc(); // fetch data   
      $userID = $Row["UserID"];
      $insulinTypeOther = $Row["insulinType"];


 if($insulinTypeOther == 'Detemir' || $insulinTypeOther == 'Glargine' || $insulinTypeOther == 'Degludec'){
  $insulinTypeOther = $Row["insulinType"];
 } else {
  $insulinTypeOther = '';
 }
}
$response[] = array("flag"=> $flag, "userID"=> $userID, "insulinReg"=> $insulinReg, "insulinType"=> $insulinType, "insulinTypeOther"=> $insulinTypeOther);

echo json_encode($response);

