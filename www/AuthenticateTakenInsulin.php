<?php
include('connect.php');

$mail = $obj['email']; //هذا اللي اخذه من اليوزر 
$uPass = md5($obj['pass']);//هذا اللي اخذه من اليوزر
$uID = $obj['UserID'];
$flag = "false";
$cur = 1;
$userID = "";
$takenInslin = "";
$BGLevel = "";
$reasonForInsulin = "";
$CHO = "";
$insulinDose = "";
$doseTime = "";
$doseDate = "";
$suggestedAccepted = "";
$userInsulinDose = ""; 
$Dose_time_hours = 0;
$Dose_time_minutes = 0;
$Dose_Date_Day = 0;
$Dose_Date_Month = 0;
$Dose_Date_Year = 0 ;

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
                $selectQuerry1 = $conn -> prepare("SELECT * FROM takeninsulindose WHERE UserID = ? AND current = ?");
                $selectQuerry1 -> bind_param("ii", $uID, $cur); 
                $selectQuerry1 -> execute();
                $result1 = $selectQuerry1->get_result(); // get the mysqli result
                $Row = $result1->fetch_assoc(); // fetch data   
                $userID = $Row["UserID"];
                $takenInslin = $Row["takenInslin"];
                $BGLevel = $Row["BGLevel"];
                $reasonForInsulin = $Row["reasonForInsulin"];
                $CHO = $Row["CHO"];
                $insulinDose = $Row["insulinDose"];
                $Dose_time_hours = $Row["Dose_time_hours"];
                $Dose_time_minutes = $Row["Dose_time_minutes"];
                $Dose_Date_Day = $Row["Dose_Date_Day"];
                $Dose_Date_Month = $Row["Dose_Date_Month"];
                $Dose_Date_Year = $Row["Dose_Date_Year"];
                $suggestedAccepted = $Row["suggestedAccepted"];
                $userInsulinDose = $Row["userInsulinDose"];
}
$response[] = array("userID"=> $userID, "takenInslin"=> $takenInslin,"BGLevel"=> $BGLevel, "reasonForInsulin"=> $reasonForInsulin, "CHO"=> $CHO, "insulinDose"=> $insulinDose, "Dose_time_hours"=> $Dose_time_hours, "Dose_time_minutes"=> $Dose_time_minutes, "Dose_Date_Day"=> $Dose_Date_Day, "Dose_Date_Month"=> $Dose_Date_Month, "Dose_Date_Year"=> $Dose_Date_Year, "suggestedAccepted"=> $suggestedAccepted, "userInsulinDose"=> $userInsulinDose);

echo json_encode($response);

