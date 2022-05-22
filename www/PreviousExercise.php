<?php
include('connect.php');

$currentState= true;

$typeExercise = $obj['typeEx'];
$duration   = $obj['duration '];
$timeExercise   = $obj['timeEX  '];
$currentState = $obj[$currentState];

    $InsertQuerry = "INSERT INTO previousexercise (typeEx, typeEx, timeEX, current) VALUES('$typeExercise', '$duration', '$timeExercise')";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
}
$response[] = array("Message" => $Message);

echo json_encode($response);
