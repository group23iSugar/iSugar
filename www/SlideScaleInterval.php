<?php
include('connect.php');

$currentState= true;

$from = $obj['fromTime '];
$to = $obj['toTime '];
$currentState = $obj[$currentState];
$addition_date  = $obj['AdditionDate '];

    $InsertQuerry = "INSERT INTO  slidescaleinterval (fromTime, toTime, current, AdditionDate) VALUES('$from', '$to', '$currentState', '$addition_date')";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
}
$response[] = array("Message" => $Message);

echo json_encode($response);
