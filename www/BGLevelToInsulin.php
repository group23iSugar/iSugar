<?php
include('connect.php');

$currentState= true;

$fromBG = $obj['fromBGLevel '];
$toBG = $obj['toBGLevel '];
$insulin_dose = $obj['insulinDose '];
$currentState = $obj[$currentState];
$addition_date  = $obj['AdditionDate '];

    $InsertQuerry = "INSERT INTO  bgleveltoInsulin (fromBGLevel, toBGLevel, insulinDose, current, AdditionDate) VALUES('$fromBG', '$toBG', '$insulin_dose', '$currentState', '$addition_date')";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
}
$response[] = array("Message" => $Message);

echo json_encode($response);
