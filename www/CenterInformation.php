<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$centerName = $obj['nameC'];
$centerCity = $obj['city'];

    $InsertQuerry = "INSERT INTO  centerinformation (UserID, nameC, city, current, AdditionDate) VALUES('$id','$centerName', '$centerCity', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
