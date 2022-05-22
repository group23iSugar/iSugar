<?php
include('connect.php');


$currentState= true;
$id = $obj['UserID'];
$startBGcorrect = $obj['startBG'];

    $InsertQuerry = "INSERT INTO startbg_correct (UserID, startBG, current, AdditionDate) VALUES('$id', '$startBGcorrect', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
