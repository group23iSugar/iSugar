<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$insulinReg = $obj['insulinRegimen'];


    $InsertQuerry = "INSERT INTO insulin_regimen (UserID, insulinRegimen, current, AdditionDate) VALUES('$id', '$insulinReg', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
