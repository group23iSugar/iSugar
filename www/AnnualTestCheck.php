<?php
include('connect.php');

$uID = $obj['UserID'];
$flag = "false";
$userID='';
$thyroid = '';
$antiTPO = '';
$tsh = '';
$ft4 = '';
$adrenal = '';
$cortisol = '';
$na = '';
$k = '';
$celiac = '';
$IgA = '';
$tTG_IgA = '';
$tTG_IgG = '';
$DeamidatedGliadinIgA = '';
$DeamidatedGliadinIgG = '';
$Renal = '';
$ACR = '';
$lipids = '';
$TG = '';
$LDL = '';
$HDL = '';
$cholesterol = '';
$BloodPressureDate = '';
$BP_Reading = '';
$eyes = '';
$finding = '';
$LastFluVaccine = '';
$LastDentalVisit = '';

    $InsertQuerry = $conn -> prepare("INSERT INTO  annualtest (UserID) VALUES(?)");
    $InsertQuerry -> bind_param("i", $uID); 
    $InsertQuerry -> execute();

        if ($InsertQuerry->affected_rows==1) { 
            $selectQuerry1 = $conn -> prepare("SELECT * FROM annualtest WHERE UserID = ?");
            $selectQuerry1 -> bind_param("s", $uID); 
            $selectQuerry1 -> execute();
            $result = $selectQuerry1->get_result(); // get the mysqli result
            $Row = $result->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $thyroid = $Row["Thyroid_date"];
              $antiTPO = $Row["Anti_TPO"];
              $tsh = $Row["TSH"];
              $ft4 = $Row["FT4"];
              $adrenal = $Row["Adrenal_date"];
              $cortisol = $Row["cortisol"];
              $na = $Row["NA"];
              $k = $Row["K"];
              $celiac = $Row["Celiac_date"];
              $IgA = $Row["IgA"];
              $tTG_IgA = $Row["tTG_IgA"];
              $tTG_IgG = $Row["tTG_IgG"];
              $DeamidatedGliadinIgA = $Row["Deamidated_Gliadin_IgA"];
              $DeamidatedGliadinIgG = $Row["Deamidated_Gliadin_IgG"];
              $Renal = $Row["Renal_date"];
              $ACR = $Row["ACR"];
              $lipids = $Row["Lipids_date"];
              $TG = $Row["TG"];
              $LDL = $Row["LDL"];
              $HDL = $Row["HDL"];
              $cholesterol = $Row["Cholesterol"];
              $BloodPressureDate = $Row["Blood_Pressure_date"];
              $BP_Reading = $Row["BP_reading"];
              $eyes = $Row["Eyes_date"];
              $finding = $Row["Finding"];
              $LastFluVaccine = $Row["LastFluVaccine"];
              $LastDentalVisit = $Row["LastDentalVisit"];
              $flag = "true";
       }
            else {
                $flag = "False";
            }
      
$response[] = array("flag"=> $flag, "userID"=> $userID, "thyroid"=> $thyroid, "antiTPO"=> $antiTPO, "tsh"=> $tsh, "ft4"=> $ft4, "adrenal"=> $adrenal, "cortisol"=> $cortisol, "na"=> $na, "k"=> $k, "celiac"=> $celiac, "IgA"=> $IgA, "tTG_IgA"=> $tTG_IgA, "tTG_IgG"=> $tTG_IgG, "DeamidatedGliadinIgA"=> $DeamidatedGliadinIgA, "DeamidatedGliadinIgG"=> $DeamidatedGliadinIgG, "Renal"=> $Renal, "ACR"=> $ACR, "lipids"=> $lipids, "TG"=> $TG, "LDL"=> $LDL, "HDL"=> $HDL, "cholesterol"=> $cholesterol, "BloodPressureDate"=> $BloodPressureDate, "BP_Reading"=> $BP_Reading, "eyes"=> $eyes, "finding"=> $finding, "LastFluVaccine"=> $LastFluVaccine, "LastDentalVisit"=> $LastDentalVisit);

echo json_encode($response);

