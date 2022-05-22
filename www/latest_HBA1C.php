<?php
include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$latestHB1AC = $obj['latest_HP1AC'];

    $InsertQuerry = "INSERT INTO  latest_hb1ac  (UserID, latest_HP1AC, current, AdditionDate) VALUES('$id', '$latestHB1AC', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
$response[] = array("Message" => $Message);

echo json_encode($response);
