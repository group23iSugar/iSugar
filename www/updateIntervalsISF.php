<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include('connect.php');

$id = $obj['UserID'];
$from = $obj['fromTime'];
$to = $obj['toTime'];
$isf = $obj['ISF'];
$bgTarget = $obj['targetBG'];
$bgStart = $obj['startBG'];
$from1 = $obj['fromTime1'];
$to1 = $obj['toTime1'];
$isf1 = $obj['ISF1'];
$bgTarget1 = $obj['targetBG1'];
$bgStart1 = $obj['startBG1'];
$currOld = false;


$updateQuerry = "UPDATE isfinterval SET fromTime='$from1', toTime='$to1', ISF='$isf1', targetBG='$bgTarget1', startBG='$bgStart1' WHERE UserID='$id' AND fromTime='$from' AND toTime='$to' AND ISF='$isf'";
if ($conn->query($updateQuerry) === TRUE) {
    $Message = 'Success';
} else {
  $Message = 'Error';
}
$response[] = array("Message" => $Message);

echo json_encode($response);
