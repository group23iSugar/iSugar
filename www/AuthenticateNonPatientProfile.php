<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
$flag = "false";
$cur = 1;
$userID='';
$dob='';
$weight_KG= 0;
$latest_HP1AC= 0;
$latest_HP1AC_date='';
$typeOfGlucoseM= '';
$glucoseLevel_unit='';
$ketonesMeasure='';
$insulinRegimen='';
$ISF= 0;
$ISFInter=0;
$targetBG= 0;
$startBG= 0;
$insulinCalc='';
$fromBG= 0;
$toBG= 0;


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
            $selectQuerry1 = "SELECT * FROM dob WHERE UserID= '$uID' AND current= '$cur'";  
            $selectQuerry2 = "SELECT * FROM weigthkg WHERE UserID= '$uID' AND current= '$cur'"; 
            $selectQuerry3 = "SELECT * FROM latest_hba1c WHERE UserID= '$uID' AND current= '$cur'"; 
            $selectQuerry4 = "SELECT * FROM latest_hba1c_date WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry5 = "SELECT * FROM typeofglucosemonitoring WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry6 = "SELECT * FROM glucoselevelunit WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry7 = "SELECT * FROM ketonesmeasurement WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry8 = "SELECT * FROM insulin_regimen WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry9 = "SELECT * FROM isf WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry10 = "SELECT * FROM isfintervals WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry11 = "SELECT * FROM targetbg_correct WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry12 = "SELECT * FROM startbg_correct WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry13 = "SELECT * FROM insulincalcmethod WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry14 = "SELECT * FROM targetbgperday WHERE UserID= '$uID' AND current= '$cur'";
        

            $R1 = mysqli_query($conn, $selectQuerry1);
            $R2 = mysqli_query($conn, $selectQuerry2);
            $R3 = mysqli_query($conn, $selectQuerry3);
            $R4 = mysqli_query($conn, $selectQuerry4);
            $R5 = mysqli_query($conn, $selectQuerry5);
            $R6 = mysqli_query($conn, $selectQuerry6);
            $R7 = mysqli_query($conn, $selectQuerry7);
            $R8 = mysqli_query($conn, $selectQuerry8);
            $R9 = mysqli_query($conn, $selectQuerry9);
            $R10 = mysqli_query($conn, $selectQuerry10);
            $R11 = mysqli_query($conn, $selectQuerry11);
            $R12 = mysqli_query($conn, $selectQuerry12);
            $R13 = mysqli_query($conn, $selectQuerry13);
            $R14 = mysqli_query($conn, $selectQuerry14);
         
         

            if (mysqli_num_rows($R1) > 0) {
                $Row =mysqli_fetch_assoc($R1);
                $userID = $Row["UserID"];
                $dob = $Row['DOP'];
        }
            if (mysqli_num_rows($R2) > 0) {
               $Row =mysqli_fetch_assoc($R2);
            $userID = $Row["UserID"];
            $weight_KG = $Row["weight_KG"];
        }
            if (mysqli_num_rows($R3) > 0) {
               $Row =mysqli_fetch_assoc($R3);
            $userID = $Row["UserID"];
            $latest_HP1AC = $Row["latest_HP1AC"];
        }
            if (mysqli_num_rows($R4) > 0) {
              $Row =mysqli_fetch_assoc($R4);
            $userID = $Row["UserID"];
            $latest_HP1AC_date = $Row["latest_HP1AC_date"];
        }
            if (mysqli_num_rows($R5) > 0) {
              $Row =mysqli_fetch_assoc($R5);
            $userID = $Row["UserID"];
            $typeOfGlucoseM = $Row["typeOfGlucoseM"];
        }
            if (mysqli_num_rows($R6) > 0) {
              $Row =mysqli_fetch_assoc($R6);
            $userID = $Row["UserID"];
            $glucoseLevel_unit = $Row["glucoseLevel_unit"];
        }
           if (mysqli_num_rows($R7) > 0) {
             $Row =mysqli_fetch_assoc($R7);
            $userID = $Row["UserID"];
            $ketonesMeasure = $Row["ketonesMeasure"];
        }
if (mysqli_num_rows($R8) > 0) {
    $Row =mysqli_fetch_assoc($R8);
  $userID = $Row["UserID"];
  $insulinRegimen = $Row["insulinRegimen"];
}
if (mysqli_num_rows($R9) > 0) {
    $Row =mysqli_fetch_assoc($R9);
  $userID = $Row["UserID"];
  $ISF = $Row["ISF"];
}
if (mysqli_num_rows($R10) > 0) {
    $Row =mysqli_fetch_assoc($R10);
  $userID = $Row["UserID"];
  $ISFInter = $Row["ISFInter"];
}
if (mysqli_num_rows($R11) > 0) {
    $Row =mysqli_fetch_assoc($R11);
  $userID = $Row["UserID"];
  $targetBG = $Row["targetBG"];
}
if (mysqli_num_rows($R12) > 0) {
    $Row =mysqli_fetch_assoc($R12);
  $userID = $Row["UserID"];
  $startBG = $Row["startBG"];
}
if (mysqli_num_rows($R13) > 0) {
    $Row =mysqli_fetch_assoc($R13);
  $userID = $Row["UserID"];
  $insulinCalc = $Row["insulinCalc"];
}
if (mysqli_num_rows($R14) > 0) {
    $Row =mysqli_fetch_assoc($R14);
  $userID = $Row["UserID"];
  $fromBG = $Row["fromBG"];
  $toBG = $Row["toBG"];
}
    }
}
$response[] = array("dob"=> $dob, "weight_KG"=> $weight_KG, "latest_HP1AC"=> $latest_HP1AC, "latest_HP1AC_date"=> $latest_HP1AC_date, "typeOfGlucoseM"=> $typeOfGlucoseM, "glucoseLevel_unit"=> $glucoseLevel_unit, "ketonesMeasure"=> $ketonesMeasure, "insulinRegimen"=> $insulinRegimen, "ISF"=> $ISF, "ISFInter"=> $ISFInter, "targetBG"=> $targetBG, "startBG"=> $startBG, "insulinCalc"=> $insulinCalc, "fromBG"=> $fromBG, "toBG"=> $toBG);

echo json_encode($response);

