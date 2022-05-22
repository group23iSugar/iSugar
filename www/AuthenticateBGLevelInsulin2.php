<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
//$sID = $obj['ssID'];
$flag = "false";
$cur = 1;
$bgID = '';
$ssID='';
$fromBGLevel= 0;
$toBGLevel= 0;
$insulinDose= 0;

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

      $selectQ = "SELECT * FROM slidescaleinterval WHERE UserID= '$uID' AND current= '$cur'"; 
      $RR = mysqli_query($conn, $selectQ);
      $datasSS = array();
      if (mysqli_num_rows($RR) > 0) {
          while($Row =mysqli_fetch_assoc($RR)){
              $datasSS[] = $Row;
          }//end while 
        }//end if 

        $countss = 0;
        foreach ($datasSS as $data){
          $userID = $data["UserID"];
          $ssID = $data["ssID"];
          $fromTime = $data["fromTime"];
          $toTime = $data["toTime"];
         $countss = $countss+1;
          $response1[] = array("userID"=> $userID, "ssID"=> $ssID, "fromTime"=> $fromTime, "toTime"=> $toTime);
        }//foreach ss
      // $countss = count($response1);
        //echo json_encode($countss);

   //     $i = 0;
        //echo json_encode($countss);
       // echo json_encode($ssID[$i]);
    //  echo json_encode($response1[$i]["ssID"]);
   
    for ($i = 0; $i <$countss ; $i++) {
      $sID  = $response1[$i]["ssID"];
      //echo json_encode($sID);
      $selectQuerry1 = "SELECT * FROM bgleveltoinsulin WHERE ssID= '$sID' AND current= '$cur'";   
      $R1 = mysqli_query($conn, $selectQuerry1);
      $datas = array();
      if (mysqli_num_rows($R1) > 0) {
          while($Row =mysqli_fetch_assoc($R1)){
              $datas[] = $Row;
          }//end while 
        }//end if 
      
        $count = 0;
       // $arrCount = array();
        foreach ($datas as $data){
          $bgID = $data["bgID"];
          $ssID = $data["ssID"];
          $fromBGLevel = $data["fromBGLevel"];
          $toBGLevel = $data["toBGLevel"];
          $insulinDose = $data["insulinDose"];
          $count = $count+1;
         // array_push($arrCount, $count);
          $response2[] = array("bgID"=> $bgID, "ssID"=> $ssID, "fromBGLevel"=> $fromBGLevel, "toBGLevel"=> $toBGLevel, "insulinDose"=> $insulinDose);
          $countq[] = array($ssID);
        //  $counter[] = array($bgID);
      }
   //   $counter = array($count);
   //   echo json_encode($counter); 
   //  echo json_encode($count); 
   
    }//for loop 
   //$Counter2 = array($counter);
  // echo json_encode($Counter2); 

  $counterS = count($countq);
    $response = array(
      $countq,
      $counterS,
      $response2
      );
    echo json_encode($response);
  }
}





