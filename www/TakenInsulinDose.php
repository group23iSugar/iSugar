<?php
include('connect.php');

$currentState= true;

$BG_level = $obj['BGLevel'];
$reason = $obj['reasonForInsulin '];
$cho = $obj['CHO'];
$insulin_Dose = $obj['insulinDose '];
$dTime = $obj['doseTime '];
$dDate = $obj['doseDate '];
$currentState = $obj[$currentState];

    $InsertQuerry = "INSERT INTO  takeninsulindose  (BGLevel, reasonForInsulin, CHO, insulinDose, doseTime, doseDate, current) VALUES('$dateOfBirth', '$reason', '$cho', '$insulin_Dose', '$dTime', '$dDate', '$currentState')";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
}
$response[] = array("Message" => $Message);

echo json_encode($response);
