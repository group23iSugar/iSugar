<?php
$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$database = mysqli_select_db($conn, 'isugaronline'); 

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

