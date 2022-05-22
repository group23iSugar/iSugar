<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$isf = $obj['ISF'];


    $InsertQuerry = "INSERT INTO isf (UserID, ISF, current, AdditionDate) VALUES('$id','$isf', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
