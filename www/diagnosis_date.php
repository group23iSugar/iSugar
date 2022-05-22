<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$diagnosisDate = $obj['diagnosisD'];


    $InsertQuerry = "INSERT INTO  diagnosis_date (UserID, diagnosisD , current, AdditionDate) VALUES('$id', '$diagnosisDate', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
