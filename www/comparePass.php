<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

include('connect.php');

$uPass = md5($obj['pass']);
$uID = $obj['UserID'];

    $selectQuerry = "SELECT * FROM useraccount WHERE UserID='$uID'";

    $R = mysqli_query($conn, $selectQuerry);

    if (mysqli_num_rows($R) > 0) {
        $Row =mysqli_fetch_assoc($R);
        $password =  $Row['pass'];
        if ($uPass == $password){
            $flag = "true";
        } else {
            $flag = "false";
        }
    }
    
$response[] = array("flag" => $flag);

echo json_encode($response);
