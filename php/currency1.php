<?php

	$executionStartTime = microtime(true) / 1000;

//$from = $_REQUEST['from'];
  //  $to = $_REQUEST['to'];
    //$amount = $_REQUEST['amount'];

	$url='https://api.exchangeratesapi.io/latest?symbols='.$_REQUEST['symbols'].'&base='.$_REQUEST['base'].'';

//	$url='https://api.exchangeratesapi.io/latest?symbols=GBP&base=EUR';


	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
