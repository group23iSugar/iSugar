<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
$flag = "false";
$cur = 1;
$userID='';
$ssID = '';
$fromTime= '';
$toTime= '';



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
        $selectQuerry1 = "SELECT * FROM slidescaleinterval WHERE UserID= '$uID' AND current= '$cur'";  
        $R1 = mysqli_query($conn, $selectQuerry1);
        $datas = array();

        if (mysqli_num_rows($R1) > 0) {
            while($Row =mysqli_fetch_assoc($R1)){
                $datas[] = $Row;
            }//end while 
          }//end if 

          $count = 0;
          foreach ($datas as $data){
            $userID = $data["UserID"];
            $ssID = $data["ssID"];
            $fromTime = $data["fromTime"];
            $toTime = $data["toTime"];
            $count = $count+1;
            $response1[] = array("userID"=> $userID, "ssID"=> $ssID, "fromTime"=> $fromTime, "toTime"=> $toTime);
        }

      //  $counterSSID = array();
      //  for($j = 0; $j<$count; $j++){
      //  $counterSSID[$j] =   $response1[$j]["ssID"];
      //  }
      for($j = 0; $j<$count; $j++){
         $counterSSID[$j] =   array("sID"=>$response1[$j]["ssID"]);
         }

      //  echo json_encode($counterSSID);
       
        $response = array(
            $response1,
            $count,
            $counterSSID
        );
        echo json_encode($response);
    }
}