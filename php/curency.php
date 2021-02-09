<?php
// set API Endpoint, access key, required parameters


$from = $_REQUEST['from'];
$to = $_REQUEST['to'];
$amount = $_REQUEST['amount'];

// initialize CURL:
$ch = curl_init('http://data.fixer.io/api/latest?access_key=12d6c43a0d027f44c41a46686bda452e');   
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// get the JSON data:
$json = curl_exec($ch);
curl_close($ch);

// Decode JSON response:
$conversionResult = json_decode($json, true);

// access the conversion result
echo $conversionResult['result'];
?>