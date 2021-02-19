<?php

 

    ini_set('display_errors', 'On');

    error_reporting(E_ALL);

 

    $executionStartTime = microtime(true);

    $countryBorders = json_decode(file_get_contents("../js/countryBorders.geo.json"), true);

 

    $output['status']['code'] = "200";

    $output['status']['name'] = "ok";

    $output['status']['description'] = "success";

    $output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";

    $output['data']['features'] =  $countryBorders;

    header('Content-Type: application/json; charset=UTF-8');

 

    echo json_encode($output);

 

?>