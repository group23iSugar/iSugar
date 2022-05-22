<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$ketones_Measure  = $obj['ketonesMeasure'];

    $InsertQuerry = "INSERT INTO ketonesmeasurement (UserID, ketonesMeasure , current, AdditionDate) VALUES('$id', '$ketones_Measure', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
$response[] = array("Message" => $Message);

echo json_encode($response);
