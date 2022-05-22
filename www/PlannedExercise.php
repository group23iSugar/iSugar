<?php
include('connect.php');

$currentState= true;

$typeExercise = $obj['typeEx'];
$duration   = $obj['duration '];
$currentState = $obj[$currentState];

    $InsertQuerry = "INSERT INTO plannedexercise (typeEx, typeEx, current) VALUES('$typeExercise', '$duration', '$currentState')";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
}
$response[] = array("Message" => $Message);

echo json_encode($response);
