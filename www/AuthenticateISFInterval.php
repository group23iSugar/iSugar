<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
$flag = "false";
$cur = 1;
$userID='';
$fromTime= '';
$toTime='';
$ISF= '';
$targetBG= '';
$startBG= '';

    $selectQuerry = "SELECT * FROM useraccount WHERE UserID='$uID'";

    $R = mysqli_query($conn, $selectQuerry);

    if (mysqli_num_rows($R) > 0) {
        $Row =mysqli_fetch_assoc($R);
        $Email = $Row['email'];
        $password =  $Row['pass'];
        

        if ($mail == $Email && $uPass == $password){
            $flag = "true";

        } else {
            $flag= "false";
        }

        if($flag == "true"){
            $selectQuerry1 = "SELECT * FROM isfinterval WHERE UserID= '$uID' AND current= '$cur'";  
            $R1 = mysqli_query($conn, $selectQuerry1);
            if (mysqli_num_rows($R1) > 0) {
                $Row =mysqli_fetch_assoc($R1);
                $userID = $Row["UserID"];
                $fromTime = $Row["fromTime"];
                $toTime = $Row["toTime"];
                $ISF = $Row["ISF"];
                $targetBG = $Row["targetBG"];
                $startBG = $Row["startBG"];
        }
    }
}
$response[] = array("userID"=> $userID, "fromTime"=> $fromTime, "toTime"=> $toTime, "ISF"=> $ISF, "targetBG"=> $targetBG, "startBG"=> $startBG);

echo json_encode($response);

