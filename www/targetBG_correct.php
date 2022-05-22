<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$targetBGcorrect = $obj['targetBG'];

    $InsertQuerry = "INSERT INTO targetbg_correct (UserID, targetBG, current, AdditionDate) VALUES('$id', '$targetBGcorrect', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
