<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$from = $obj['fromTime'];
$to = $obj['toTime'];
$icr = $obj['ICR'];

    $InsertQuerry = "INSERT INTO  icrinterval  (UserID, fromTime, toTime, ICR,current, AdditionDate) VALUES('$id', '$from', '$to', '$icr', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);

