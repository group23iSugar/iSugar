<?php
include('connect.php');

$uID = $obj['UserID'];
$thyroid = $obj['Thyroid_date'];
$antiTPO = $obj['Anti_TPO'];
$tsh = $obj['TSH'];
$ft4 = $obj['FT4'];
$adrenal = $obj['Adrenal_date'];
$cortisol = $obj['cortisol'];
$na = $obj['NA'];
$k = $obj['K'];
$celiac = $obj['Celiac_date'];
$IgA = $obj['IgA'];
$tTG_IgA = $obj['tTG_IgA'];
$tTG_IgG = $obj['tTG_IgG'];
$DeamidatedGliadinIgA = $obj['Deamidated_Gliadin_IgA'];
$DeamidatedGliadinIgG = $obj['Deamidated_Gliadin_IgG'];
$Renal = $obj['Renal_date'];
$ACR = $obj['ACR'];
$lipids = $obj['Lipids_date'];
$TG = $obj['TG'];
$LDL = $obj['LDL'];
$HDL = $obj['HDL'];
$cholesterol = $obj['Cholesterol'];
$BloodPressureDate = $obj['Blood_Pressure_date'];
$BP_Reading = $obj['BP_reading'];
$eyes = $obj['Eyes_date'];
$finding = $obj['Finding'];
$LastFluVaccine = $obj['LastFluVaccine'];
$LastDentalVisit = $obj['LastDentalVisit'];


    $InsertQuerry = $conn -> prepare("INSERT INTO  annualtest (UserID, Thyroid_date, Anti_TPO, TSH, FT4, Adrenal_date, cortisol, NA, K, Celiac_date, IgA, tTG_IgA, tTG_IgG, Deamidated_Gliadin_IgA, Deamidated_Gliadin_IgG, Renal_date, ACR, Lipids_date, TG, LDL, HDL, Cholesterol, Blood_Pressure_date, BP_reading, Eyes_date, Finding, LastFluVaccine, LastDentalVisit, Addition_Date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $InsertQuerry -> bind_param("isdddsdddsdddddsdsddddsdsssss", $uID, $thyroid, $antiTPO, $tsh, $ft4, $adrenal, $cortisol, $na, $k, $celiac, $IgA, $tTG_IgA, $tTG_IgG, $DeamidatedGliadinIgA, $DeamidatedGliadinIgG, $Renal, $ACR, $lipids, $TG, $LDL, $HDL, $cholesterol, $BloodPressureDate, $BP_Reading,  $eyes, $finding, $LastFluVaccin, $LastDentalVisit, now()); 
    $InsertQuerry -> execute();

    
if ($InsertQuerry->affected_rows==1 ) {
    $Message = "Success";
} else {
    $Message = "ERROR";
}

$response[] = array("Message" => $Message);

echo json_encode($response);