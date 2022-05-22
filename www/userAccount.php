<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

include('connect.php');

$fname = $obj['firstname'];
$lname = $obj['lastname'];
$Email  = $obj['email'];
$password = md5($obj['pass']); //password is hashed
$accountT = $obj['accountType'];


$SQL = "SELECT * FROM useraccount  WHERE email = '$Email'";
$exeSQL = mysqli_query($conn, $SQL);
$checkEmail =  mysqli_fetch_array($exeSQL);

// if (isset($checkEmail)) {
//     $Message = "Email Already Exist, Please Try Again !";
// } else {

    $InsertQuerry = "INSERT INTO  useraccount(firstname, lastname, email, pass, accountType) VALUES('$fname', '$lname', '$Email', '$password', '$accountT')";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Success";
    } else {
        $Message = "Error";
    }
// }
$response[] = array("Message" => $Message);

echo json_encode($response);
