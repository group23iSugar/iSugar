<?php
include('connect.php');

$uID = $obj['UserID'];
$flag = "false";
$cur = 1;
$userID='';
$takenInslin= 0;
$currentTaken = 0;
$currentPlanned = 0;

$selectQuerry1 = $conn -> prepare("SELECT * FROM useraccount WHERE UserID = ?");
$selectQuerry1 -> bind_param("i", $uID); 
$selectQuerry1 -> execute();

 if ($selectQuerry1->get_result()) {
          
            $selectQuerry2 = $conn -> prepare("SELECT * FROM takeninsulindose WHERE  UserID= ? AND current= ?");
              $selectQuerry2 -> bind_param("ii", $uID, $cur); 
              $selectQuerry2 -> execute();
              $result2 = $selectQuerry2->get_result(); // get the mysqli result
              $Row = $result2->fetch_assoc(); // fetch data   
              $userID = $Row["UserID"];
              $takenInslin = $Row["takenInslin"];
              $currentTaken = $Row["current"];
              $flag = "true"; 
              
           $selectQuerry3 = "SELECT * FROM plannedexercise WHERE takenInsulinID= '$takenInslin' AND current= '$cur'"; 
           $R3 = mysqli_query($conn, $selectQuerry3);
           if (mysqli_num_rows($R3) > 0) {
             $Row =mysqli_fetch_assoc($R3);
              $currentPlanned = $Row["current"];
           }
 }
         else {
            $flag = "False";
        }
      
$response[] = array("flag"=> $flag, "userID"=> $userID, "takenInslin"=> $takenInslin, "currentTaken"=> $currentTaken, "currentPlanned"=> $currentPlanned);

echo json_encode($response);

