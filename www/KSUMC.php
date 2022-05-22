<?php
include('connect.php');

$currentState= true;

$id = $obj['UserID'];
$MRN_KSUMC = $obj['MRN'];


    $InsertQuerry = "INSERT INTO  ksumc  (UserID, MRN, current, AdditionDate) VALUES('$id', '$MRN_KSUMC', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
