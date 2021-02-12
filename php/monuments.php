<?php

	$executionStartTime = microtime(true) / 1000;


    $url='https://api.foursquare.com/v2/venues/explore?client_id=CQLPBXTI3VRT5X0CEINCFG1WLPF44PDTFJQ4NZZWWDOMHQR0&client_secret=0G00YJ1PVNU4TLRYLCP0NRM5F45EROD0LVBMLT12KNFBAIDY&near='.$_REQUEST['country'].'&categoryId=4deefb944765f83613cdba6e&v=20180809&limit=5';
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
