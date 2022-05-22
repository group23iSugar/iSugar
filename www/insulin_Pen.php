<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$insulinT = $obj['insulinType'];
$half_Full = $obj['halfOrFull'];


    $InsertQuerry = "INSERT INTO  insulin_pen (UserID, insulinType, halfOrFull , current, AdditionDate) VALUES('$id','$insulinT', '$half_Full', '$currentState', now())";
    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
