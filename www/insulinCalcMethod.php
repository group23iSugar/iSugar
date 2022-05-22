<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$insulinCalculation = $obj['insulinCalc'];

    $InsertQuerry = "INSERT INTO insulincalcmethod (UserID, insulinCalc, current, AdditionDate) VALUES('$id', '$insulinCalculation', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
