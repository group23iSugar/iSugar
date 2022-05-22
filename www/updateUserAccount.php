<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include('connect.php');

$fname = $obj['firstname'];
$lname = $obj['lastname'];
$Email  = $obj['email'];
$uID = $obj['UserID'];
$password = md5($obj['pass']); //password is hashed
if ($obj['pass'] != '' ){
  $updateQuerry = "UPDATE useraccount SET firstname='$fname', lastname='$lname', email='$Email', pass='$password' WHERE UserID='$uID' ";

  if ($conn->query($updateQuerry) === TRUE) {
      $Message = 'Success';
    } else {
      $Message = 'Error';
    }

    $response[] = array("Message" => $Message);

    echo json_encode($response);
} else {
  $updateQuerry = "UPDATE useraccount SET firstname='$fname', lastname='$lname', email='$Email' WHERE UserID='$uID' ";

  if ($conn->query($updateQuerry) === TRUE) {
      $Message = 'Success';
    } else {
      $Message = 'Error';
    }

    $response[] = array("Message" => $Message);

    echo json_encode($response);
}


    