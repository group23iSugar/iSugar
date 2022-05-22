<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$ISFinterval = $obj['ISFInter'];;

    $InsertQuerry = "INSERT INTO isfintervals (UserID, ISFInter, current, AdditionDate) VALUES('$id','$ISFinterval', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
