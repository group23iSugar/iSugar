<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

include('connect.php');

$currentState= true;
$id = $obj['UserID'];
$centerName = $obj['nameC'];
$centerCity = $obj['city'];
$currOld = false;

$selectQuerry = "SELECT UserID FROM centerinformation WHERE UserID='$id' ";
$result = $conn->query($selectQuerry);
if ($result->num_rows > 0) {
    $updateQuerry = "UPDATE centerinformation SET current='$currOld' WHERE UserID='$id' ";
    if ($conn->query($updateQuerry) === TRUE) {
        $Message0 = 'Success';
    } else {
      $Message0 = 'Error';
    }
}

    $InsertQuerry = "INSERT INTO  centerinformation (UserID, nameC, city, current, AdditionDate) VALUES('$id','$centerName', '$centerCity', '$currentState', now())";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);
