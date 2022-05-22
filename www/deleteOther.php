<?php
include('connect.php');

$uID = $obj['UserID'];
$currOld = false;
$currNew = true;

        $updateQuerry = "UPDATE centerinformation SET current='$currOld' WHERE UserID='$uID' ";
        if ($conn->query($updateQuerry) === TRUE) {
            $Message = 'Success';
        } else {
          $Message = 'Error';
        }
    
        $response[] = array("Message" => $Message);
    
        echo json_encode($response);
       