<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$insulinT = $obj['insulinType'];
$dose = $obj['iDose'];
$time = $obj['iTime'];;

    $InsertQuerry = "INSERT INTO  insulin_Other(UserID, insulinType, iDose, iTime, current, AdditionDate) VALUES('$id', '$insulinT', '$dose', '$time', '$currentState', now())";
    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);