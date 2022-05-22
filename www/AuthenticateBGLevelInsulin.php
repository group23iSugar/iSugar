<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
$sID = $obj['ssID'];
$flag = "false";
$cur = 1;
$bgID = '';
$ssID='';
$fromBGLevel= 0;
$toBGLevel= 0;
$insulinDose= 0;

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
   
            $selectQuerry1 = "SELECT * FROM bgleveltoinsulin WHERE ssID= '$sID' AND current= '$cur'";   
            $R1 = mysqli_query($conn, $selectQuerry1);
            if (mysqli_num_rows($R1) > 0) {
                $Row =mysqli_fetch_assoc($R1);
                $bgID = $Row["bgID"];
                $ssID = $Row["ssID"];
                $fromBGLevel = $Row["fromBGLevel"];
                $toBGLevel = $Row["toBGLevel"];
                $insulinDose = $Row["insulinDose"];
        }
  }
}

$response[] = array("bgID"=> $bgID, "ssID"=> $ssID, "fromBGLevel"=> $fromBGLevel, "toBGLevel"=> $toBGLevel, "insulinDose"=> $insulinDose);

echo json_encode($response);


<?php
include('connect.php');

$mail = $obj['email'];
$uPass = md5($obj['pass']);
$uID = $obj['UserID'];
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
        $flag= "false";
    }

    if($flag == "true"){
        $selectQuerry1 = $conn -> prepare("SELECT * FROM slidescaleinterval WHERE UserID = ? AND current = ?");
        $selectQuerry1 -> bind_param("ii", $uID, $cur); 
        $selectQuerry1 -> execute();
        $result1 = $selectQuerry1->get_result(); // get the mysqli result
        $datasSS = $result1->fetch_all(MYSQLI_ASSOC);
          $countss = 0;
          foreach ($datasSS as $data){
            $userID = $data["UserID"];
            $ssID = $data["ssID"];
            $fromTime = $data["fromTime"];
            $toTime = $data["toTime"];
            $countss = $countss+1;
            $response1[] = array("userID"=> $userID, "ssID"=> $ssID, "fromTime"=> $fromTime, "toTime"=> $toTime);
          for ($i = 0; $i <$countss ; $i++) {
            $sID  = $response1[$i]["ssID"];
              $selectQuerry2 = $conn -> prepare("SELECT * FROM bgleveltoinsulin WHERE ssID = ? AND current = ?");
              $selectQuerry2 -> bind_param("ii", $sID, $cur); 
              $selectQuerry2 -> execute();
              $result2 = $selectQuerry2->get_result(); // get the mysqli result
              $datas = $result2->fetch_all(MYSQLI_ASSOC);
              $count = 0;
              foreach ($datas as $data){
                $bgID = $data["bgID"];
                $ssID = $data["ssID"];
                $fromBGLevel = $data["fromBGLevel"];
                $toBGLevel = $data["toBGLevel"];
                $insulinDose = $data["insulinDose"];
                $count = $count+1;
                $response2[] = array("bgID"=> $bgID, "ssID"=> $ssID, "fromBGLevel"=> $fromBGLevel, "toBGLevel"=> $toBGLevel, "insulinDose"=> $insulinDose);
                $countq[] = array($ssID);
            }
    }
  $counterS = count($countq);
    $response = array(
      $countq,
      $counterS,
      $response2
      );
    echo json_encode($response);
  }
}





