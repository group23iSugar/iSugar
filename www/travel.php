<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include('connect.php');

$currentState= true;

$id = $obj['UserID'];
$tDate = $obj['travelDate'];
$cName = $obj['cityName'];
$fOrT = $obj['fromOrTo'];
$tDiff = $obj['timeDifference'];

        
        $InsertQuerry =  $conn->prepare("INSERT INTO  travel  (UserID, travelDate, cityName, fromOrTo, timeDifference, AdditionDate) VALUES('?, ?, ?, ?, ?)");
        $InsertQuerry -> bind_param("isssi", $id, $tDate, $cName, $fOrT, $tDiff, now());
        $InsertQuerry -> execute();

    
        if ( $InsertQuerry->affected_rows==1) {
            $Message = "Success";
        } else {
            $Message = "Error";
        }
    
    $response[] = array("Message" => $Message);
    
    echo json_encode($response);

    