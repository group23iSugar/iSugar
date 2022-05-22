<?php
include('connect.php');

$currentState= 1;
$id = $obj['UserID'];
$height_M = $obj['heightM'];

    $InsertQuerry = "INSERT INTO  height (UserID, heightM, current, AdditionDate) VALUES('$id','$height_M', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
$response[] = array("Message" => $Message);

echo json_encode($response);
