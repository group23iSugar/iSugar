<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$latestHB1ACDate = $obj['latest_HP1AC_date'];

    $InsertQuerry = "INSERT INTO  latest_hba1c_date (UserID, latest_HP1AC_date, current, AdditionDate) VALUES('$id','$latestHB1ACDate', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
$response[] = array("Message" => $Message);

echo json_encode($response);
