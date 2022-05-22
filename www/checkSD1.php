<?php
include('connect.php');

$uID = $obj['UserID'];
$curDate = $obj['curDate'];
$flag = "false";
$userID='';
$cur = '1';
$weight = '';
$addDate = '';
$tableUkg = "false";
$dob = '';

$selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
$selectQuerry1 -> bind_param("i", $uID); 
$selectQuerry1 -> execute();

  if ($selectQuerry1->get_result()) {
    // $selectQuerry2 =  "SELECT * FROM weigthkg WHERE UserID = '$uID' AND current = '$cur' ORDER BY AdditionDate DESC";
    $selectQuerry2 = $conn -> prepare("SELECT * FROM weigthkg WHERE UserID = ? AND current = ? ORDER BY AdditionDate DESC");
    $selectQuerry2 -> bind_param("ii", $uID, $cur); 
    $selectQuerry2 -> execute();
    $result2 = $selectQuerry2->get_result(); // get the mysqli result
    $Row = $result2->fetch_assoc(); // fetch data   
      $userID = $Row["UserID"];
      $weight = $Row["weight_KG"];
      $addDate = $Row["AdditionDate"];

    // $selectQuerry3 =  "SELECT * FROM dob WHERE UserID = '$uID' AND current = '$cur' ORDER BY AdditionDate DESC";
    $selectQuerry3 = $conn -> prepare("SELECT * FROM dob WHERE UserID = ? AND current = ? ORDER BY AdditionDate DESC");
    $selectQuerry3 -> bind_param("ii", $uID, $cur); 
    $selectQuerry3 -> execute();
    $result3 = $selectQuerry3->get_result(); // get the mysqli result
    $Row = $result3->fetch_assoc(); // fetch data   
    $userID = $Row["UserID"];
    $dob = $Row["DOP"];
    $addDate = $Row["AdditionDate"];
    $flag = "true";
   // Function call to find date difference
   $dateDiff = dateDiffInDays($addDate, $curDate);
}
 else {
    $flag = "False";
}

  function dateDiffInDays($date1, $date2) 
  {
      // Calculating the difference in timestamps
      $diff = strtotime($date2) - strtotime($date1);
  
      // 1 day = 24 hours
      // 24 * 60 * 60 = 86400 seconds
      return abs(round($diff / 86400));
  }
  
  // Display the result
     if ($dateDiff < 180){//180 days == 6 months
      $tableUkg = "true";
     }

$response[] = array("flag"=> $flag, "userID"=> $userID, "weight"=> $weight, "tableUkg"=> $tableUkg, "dob"=> $dob);

echo json_encode($response);

