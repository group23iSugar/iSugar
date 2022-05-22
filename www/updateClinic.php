<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include('connect.php');

$uID = $obj['UserID'];
$mrn = $obj['MRN'];
$currOld = false;
$currNew = true;

        $updateQuerry = "UPDATE ksumc SET current='$currOld' WHERE UserID='$uID' ";
        if ($conn->query($updateQuerry) === TRUE) {
            $Message = 'Success';
        } else {
          $Message = 'Error';
        }
    
        $response[] = array("Message" => $Message);
    
        echo json_encode($response);
       
 