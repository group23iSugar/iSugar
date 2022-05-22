<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$from = $obj['fromTime'];
$to = $obj['toTime'];
$isf = $obj['ISF'];
$bgTarget = $obj['targetBG'];
$bgStart = $obj['startBG'];

    $InsertQuerry = "INSERT INTO  isfinterval  (UserID, fromTime, toTime, ISF, targetBG, startBG, current, AdditionDate) VALUES('$id', '$from', '$to', '$isf', '$bgTarget', '$bgStart',  '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
