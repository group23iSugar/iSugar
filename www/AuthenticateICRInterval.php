<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
$flag = "false";
$cur = 1;
$userID='';
$fromTime= '';
$toTime= '';
$ICR= 0;
$fromT2= '';
$toT2= '';
$icr2_= 0;
$fromT3= '';
$toT3= '';
$icr3_= 0;
$fromT4= '';
$toT4= '';
$icr4_= 0;
$fromT5= '';
$toT5= '';
$icr5_= 0;
$fromT6= '';
$toT6= '';
$icr6_= 0;


    $selectQuerry = "SELECT * FROM useraccount WHERE UserID='$uID'";

    $R = mysqli_query($conn, $selectQuerry);

    if (mysqli_num_rows($R) > 0) {
        $Row =mysqli_fetch_assoc($R);
        $Email = $Row['email'];
        $password =  $Row['pass'];
        

        if ($mail == $Email && $uPass == $password){
            $flag = "true";

        } else {
            $flag="false";
        }

        if($flag == "true"){
            $selectQuerry1 = "SELECT * FROM icrinterval WHERE UserID= '$uID' AND current= '$cur'";  
            $R1 = mysqli_query($conn, $selectQuerry1);
            if (mysqli_num_rows($R1) > 0) {
                $Row =mysqli_fetch_assoc($R1);
                $userID = $Row["UserID"];
                $fromTime = $Row["fromTime"];
                $toTime = $Row["toTime"];
                $ICR = $Row["ICR"];
        }
    }
}
$response[] = array("userID"=> $userID, "fromTime"=> $fromTime, "toTime"=> $toTime, "ICR"=> $ICR);

echo json_encode($response);

