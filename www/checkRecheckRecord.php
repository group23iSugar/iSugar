<?php
include('connect.php');

$uID = $obj['UserID'];
$flag = "false";
$userID='';
$Date= '';
$Time='';
$type='';



    $selectQuerry = "SELECT * FROM useraccount WHERE UserID='$uID'";

    $R = mysqli_query($conn, $selectQuerry);

        if ($R) {
            $selectQuerry2 = "SELECT * FROM recheckrecord WHERE UserID= '$uID' AND recordDate = CURDATE() order by recordTime DESC"; 
            $R2 = mysqli_query($conn, $selectQuerry2);
            if (mysqli_num_rows($R2) > 0) {
              $Row =mysqli_fetch_assoc($R2);
              $flag = "true";
              $userID = $Row["UserID"];
              $Date = $Row["recordDate"];
              $Time = $Row["recordTime"];
              $type = $Row["exerciseType"];
       }
         else {
            $flag = "False";
        }
      }
$response[] = array("flag"=> $flag, "userID"=> $userID, "Date"=> $Date, "Time"=> $Time, "type"=> $type);

echo json_encode($response);

