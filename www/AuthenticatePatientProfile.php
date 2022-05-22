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
$heightM= 0;
$diagnosisD='';
$MRN=0;
$nameC='';
$city='';
$diabetes_center= 0;

    $selectQuerry = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
    $selectQuerry -> bind_param("i", $uID); 
    $selectQuerry -> execute();
    $result = $selectQuerry->get_result(); // get the mysqli result
    $Row = $result->fetch_assoc(); // fetch data   
        $Email = $Row['email'];
        $password =  $Row['pass'];

        if ($mail == $Email && $uPass == $password){
            $flag = "true";

        } else {
            $flag="false";
        }
        if($flag == "true"){
            // $selectQuerry1 = "SELECT * FROM dob WHERE UserID= '$uID' AND current= '$cur'";  
            $selectQuerry1 = $conn -> prepare("SELECT * FROM dob WHERE UserID = ? AND current = ?");
            $selectQuerry1 -> bind_param("ii", $uID, $cur); 
            $selectQuerry1 -> execute();
            $result1 = $selectQuerry1->get_result(); // get the mysqli result
            $Row = $result1->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $dob = $Row['DOP'];

            // $selectQuerry2 = "SELECT * FROM weigthkg WHERE UserID= '$uID' AND current= '$cur'"; 
            $selectQuerry2 = $conn -> prepare("SELECT * FROM weigthkg WHERE UserID = ? AND current = ?");
            $selectQuerry2 -> bind_param("ii", $uID, $cur); 
            $selectQuerry2 -> execute();
            $result2 = $selectQuerry2->get_result(); // get the mysqli result
            $Row = $result2->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $weight_KG = $Row["weight_KG"];

            // $selectQuerry3 = "SELECT * FROM latest_hba1c WHERE UserID= '$uID' AND current= '$cur'"; 
            $selectQuerry3 = $conn -> prepare("SELECT * FROM latest_hba1c WHERE UserID = ? AND current = ?");
            $selectQuerry3 -> bind_param("ii", $uID, $cur); 
            $selectQuerry3 -> execute();
            $result3 = $selectQuerry3->get_result(); // get the mysqli result
            $Row = $result3->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $latest_HP1AC = $Row["latest_HP1AC"];

            // $selectQuerry4 = "SELECT * FROM latest_hba1c_date WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry4 = $conn -> prepare("SELECT * FROM latest_hba1c_date WHERE UserID = ? AND current = ?");
            $selectQuerry4 -> bind_param("ii", $uID, $cur); 
            $selectQuerry4 -> execute();
            $result4 = $selectQuerry4->get_result(); // get the mysqli result
            $Row = $result4->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $latest_HP1AC_date = $Row["latest_HP1AC_date"];

            // $selectQuerry5 = "SELECT * FROM typeofglucosemonitoring WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry5 = $conn -> prepare("SELECT * FROM typeofglucosemonitoring WHERE UserID = ? AND current = ?");
            $selectQuerry5 -> bind_param("ii", $uID, $cur); 
            $selectQuerry5 -> execute();
            $result5 = $selectQuerry5->get_result(); // get the mysqli result
            $Row = $result5->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $typeOfGlucoseM = $Row["typeOfGlucoseM"];

            // $selectQuerry6 = "SELECT * FROM glucoselevelunit WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry6 = $conn -> prepare("SELECT * FROM glucoselevelunit WHERE UserID = ? AND current = ?");
            $selectQuerry6 -> bind_param("ii", $uID, $cur); 
            $selectQuerry6 -> execute();
            $result6 = $selectQuerry6->get_result(); // get the mysqli result
            $Row = $result6->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $glucoseLevel_unit = $Row["glucoseLevel_unit"];

            // $selectQuerry7 = "SELECT * FROM ketonesmeasurement WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry7 = $conn -> prepare("SELECT * FROM ketonesmeasurement WHERE UserID = ? AND current = ?");
            $selectQuerry7 -> bind_param("ii", $uID, $cur); 
            $selectQuerry7 -> execute();
            $result7 = $selectQuerry7->get_result(); // get the mysqli result
            $Row = $result7->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $ketonesMeasure = $Row["ketonesMeasure"];

            // $selectQuerry8 = "SELECT * FROM insulin_regimen WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry8 = $conn -> prepare("SELECT * FROM insulin_regimen WHERE UserID = ? AND current = ?");
            $selectQuerry8 -> bind_param("ii", $uID, $cur); 
            $selectQuerry8 -> execute();
            $result8 = $selectQuerry8->get_result(); // get the mysqli result
            $Row = $result8->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $insulinRegimen = $Row["insulinRegimen"];

            // $selectQuerry9 = "SELECT * FROM isf WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry9 = $conn -> prepare("SELECT * FROM isf WHERE UserID = ? AND current = ?");
            $selectQuerry9 -> bind_param("ii", $uID, $cur); 
            $selectQuerry9 -> execute();
            $result9 = $selectQuerry9->get_result(); // get the mysqli result
            $Row = $result9->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $ISF = $Row["ISF"];

            // $selectQuerry10 = "SELECT * FROM isfintervals WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry10 = $conn -> prepare("SELECT * FROM isfintervals WHERE UserID = ? AND current = ?");
            $selectQuerry10 -> bind_param("ii", $uID, $cur); 
            $selectQuerry10 -> execute();
            $result10 = $selectQuerry10->get_result(); // get the mysqli result
            if ($selectQuerry10->get_result() != false){
            $Row = $result10->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $ISFInter = $Row["ISFInter"];
            }
            
            // $selectQuerry11 = "SELECT * FROM targetbg_correct WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry11 = $conn -> prepare("SELECT * FROM targetbg_correct WHERE UserID = ? AND current = ?");
            $selectQuerry11 -> bind_param("ii", $uID, $cur); 
            $selectQuerry11 -> execute();
            $result11 = $selectQuerry11->get_result(); // get the mysqli result
            $Row = $result11->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $targetBG = $Row["targetBG"];

            // $selectQuerry12 = "SELECT * FROM startbg_correct WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry12 = $conn -> prepare("SELECT * FROM startbg_correct WHERE UserID = ? AND current = ?");
            $selectQuerry12 -> bind_param("ii", $uID, $cur); 
            $selectQuerry12 -> execute();
            $result12 = $selectQuerry12->get_result(); // get the mysqli result
            $Row = $result12->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $startBG = $Row["startBG"];

            // $selectQuerry13 = "SELECT * FROM insulincalcmethod WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry13 = $conn -> prepare("SELECT * FROM insulincalcmethod WHERE UserID = ? AND current = ?");
            $selectQuerry13 -> bind_param("ii", $uID, $cur); 
            $selectQuerry13 -> execute();
            $result13 = $selectQuerry13->get_result(); // get the mysqli result
            $Row = $result13->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $insulinCalc = $Row["insulinCalc"];

            // $selectQuerry14 = "SELECT * FROM targetbgperday WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry14 = $conn -> prepare("SELECT * FROM targetbgperday WHERE UserID = ? AND current = ?");
            $selectQuerry14 -> bind_param("ii", $uID, $cur); 
            $selectQuerry14 -> execute();
            $result14 = $selectQuerry14->get_result(); // get the mysqli result
            $Row = $result14->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $fromBG = $Row["fromBG"];
              $toBG = $Row["toBG"];

            // $selectQuerry15 = "SELECT * FROM height WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry15 = $conn -> prepare("SELECT * FROM height WHERE UserID = ? AND current = ?");
            $selectQuerry15 -> bind_param("ii", $uID, $cur); 
            $selectQuerry15 -> execute();
            $result15 = $selectQuerry15->get_result(); // get the mysqli result
            $Row = $result15->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $heightM = $Row["heightM"];

            // $selectQuerry16 = "SELECT * FROM diagnosis_date WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry16 = $conn -> prepare("SELECT * FROM diagnosis_date WHERE UserID = ? AND current = ?");
            $selectQuerry16 -> bind_param("ii", $uID, $cur); 
            $selectQuerry16 -> execute();
            $result16 = $selectQuerry16->get_result(); // get the mysqli result
            $Row = $result16->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $diagnosisD = $Row["diagnosisD"];

            // $selectQuerry17 = "SELECT * FROM ksumc WHERE UserID= '$uID' AND current= '$cur'";  
            $selectQuerry17 = $conn -> prepare("SELECT * FROM ksumc WHERE UserID = ? AND current = ?");
            $selectQuerry17 -> bind_param("ii", $uID, $cur); 
            $selectQuerry17 -> execute();
            $result17 = $selectQuerry17->get_result(); // get the mysqli result
            if ($selectQuerry17->get_result() != false){
            $Row = $result17->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $MRN = $Row["MRN"]; 
            }

            // $selectQuerry18= "SELECT * FROM centerinformation WHERE UserID= '$uID' AND current= '$cur'";
            $selectQuerry18 = $conn -> prepare("SELECT * FROM centerinformation WHERE UserID = ? AND current = ?");
            $selectQuerry18 -> bind_param("ii", $uID, $cur); 
            $selectQuerry18 -> execute();
            $result18 = $selectQuerry18->get_result(); // get the mysqli result
           
            if ($selectQuerry18->get_result() != false){
            $Row = $result18->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $nameC = $Row["nameC"];
              $city = $Row["city"];
            }
        if($MRN != 0){
        $diabetes_center = 1;
        }
        else{
        $diabetes_center = 2;
        }  
}
$response[] = array("dob"=> $dob, "weight_KG"=> $weight_KG, "latest_HP1AC"=> $latest_HP1AC, "latest_HP1AC_date"=> $latest_HP1AC_date, "typeOfGlucoseM"=> $typeOfGlucoseM, "glucoseLevel_unit"=> $glucoseLevel_unit, "ketonesMeasure"=> $ketonesMeasure, "insulinRegimen"=> $insulinRegimen, "ISF"=> $ISF, "ISFInter"=> $ISFInter, "targetBG"=> $targetBG, "startBG"=> $startBG, "insulinCalc"=> $insulinCalc, "fromBG"=> $fromBG, "toBG"=> $toBG, "heightM"=> $heightM, "diagnosisD"=> $diagnosisD, "MRN"=> $MRN, "nameC"=> $nameC, "city"=> $city, "diabetes_center"=> $diabetes_center);

echo json_encode($response);

