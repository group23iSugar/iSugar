<?php
include('connect.php');

$uID = $obj['UserID'];
$curDate = $obj['RecheckDate'];
$curTime = $obj['RecheckTime'];
$ketonesSource =  $obj['ketonesSource'];
$ketonesLevel =  $obj['ketonesLevel'];
$meal = $obj['IsMeal'];
$mealTime =  $obj['MealTime'];
$carbs =  $obj['Carbs'];
$TotalDose = $obj['TDD'];
$takeExtra = $obj['takeExtraInsulin'];
$table = $obj['tableName'];

$InsertQuerry = $conn -> prepare("INSERT INTO  rechecksickday (UserID, RecheckDate, RecheckTime, ketonesSource, ketonesLevel, IsMeal, MealTime, Carbs, TDD, takeExtraInsulin, tableName) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$InsertQuerry -> bind_param("issssssddss", $uID, $curDate, $curTime, $ketonesSource, $ketonesLevel, $meal, $mealTime, $carbs, $TotalDose, $takeExtra, $table ); 
$InsertQuerry -> execute();

if ($InsertQuerry->affected_rows==1 ) {
    $Message = "Success";
} else {
    $Message = "ERROR";
}

$response[] = array("Message" => $Message);

echo json_encode($response);

