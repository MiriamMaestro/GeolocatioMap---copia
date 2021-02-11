
<?php

$executionStartTime = microtime(true) / 1000;


//$url='https://timezone.abstractapi.com/v1/current_time?api_key=27f3383acb624be3b9dd0987a31a807e&location='.$_REQUEST['country'];
$url='https://timezone.abstractapi.com/v1/convert_time?api_key=27f3383acb624be3b9dd0987a31a807e&base_location='.$_REQUEST['baseLocation'].'&base_datetime='.$_REQUEST['baseDatetime'].'&target_location='.$_REQUEST['targetLocation'];



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