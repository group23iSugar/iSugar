<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$fromBGL = $obj['fromBG'];
$toBGL = $obj['toBG'];


    $InsertQuerry = "INSERT INTO  targetbgperday  (UserID, fromBG	, toBG, current, AdditionDate) VALUES('$id', '$fromBGL', '$toBGL', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
    
$response[] = array("Message" => $Message);

echo json_encode($response);
