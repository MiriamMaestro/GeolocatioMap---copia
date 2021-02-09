<?php
// set API Endpoint, access key, required parameters
$endpoint = 'convert';
$access_key = 'e65cb614ed85982f47864951c1065f92';

$from = $_REQUEST['from'];
$to = $_REQUEST['to'];
$amount = $_REQUEST['amount'];

// initialize CURL:
$ch = curl_init('http://data.fixer.io/api/'.$endpoint.'?access_key='.$access_key.'&from='.$from.'&to='.$to.'&amount='.$amount.'');   
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// get the JSON data:
$json = curl_exec($ch);
curl_close($ch);

// Decode JSON response:
$conversionResult = json_decode($json, true);

// access the conversion result
echo $conversionResult['result'];
?>