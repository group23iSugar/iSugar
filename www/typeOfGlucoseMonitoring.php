<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$typeOfGlucose = $obj['typeOfGlucoseM'];


    $InsertQuerry = "INSERT INTO typeofglucosemonitoring (UserID, typeOfGlucoseM, current, AdditionDate) VALUES('$id', '$typeOfGlucose', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
    
$response[] = array("Message" => $Message);

echo json_encode($response);
