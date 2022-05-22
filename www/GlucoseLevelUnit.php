<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$unit  = $obj['glucoseLevel_unit'];

    $InsertQuerry = "INSERT INTO glucoselevelunit (UserID, glucoseLevel_unit , current, AdditionDate) VALUES('$id', '$unit', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
$response[] = array("Message" => $Message);

echo json_encode($response);
