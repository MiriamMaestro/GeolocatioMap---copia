<?php

	$executionStartTime = microtime(true) / 1000;


	$url='https://api.openweathermap.org/data/2.5/onecall?lat='.$_REQUEST['lat'].'&lon='.$_REQUEST['long'].'&exclude=hourly&appid=ea7a411ce7acd736e13c1457bcf63da1';



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
