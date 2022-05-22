<?php
include('connect.php');


$userEmail = $obj['email'];

    $selectQuerry = "SELECT * FROM useraccount WHERE email='$userEmail'";

    $R = mysqli_query($conn, $selectQuerry);

    if (mysqli_num_rows($R) > 0) {
        $Row =mysqli_fetch_assoc($R);
        $userID = $Row["UserID"];
        $firstName = $Row["firstname"];
        $lastName = $Row["lastname"];
        $emailUser = $Row["email"];
    }
    else {
        $userID = "";
        $firstName = "";
        $lastName = "";
        $emailUser = "";
    }
$response[] = array("userID"=> $userID, "fName" => $firstName, "lName" => $lastName, "email" => $emailUser);

echo json_encode($response);
