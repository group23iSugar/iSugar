<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$dateOfBirth = $obj['DOP'];


    $InsertQuerry = "INSERT INTO  dob (UserID, DOP, current, AdditionDate) VALUES('$id', '$dateOfBirth', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
