<?php

// Read JSON file
$json = file_get_contents('../js/countryBorders.geo.json');

//Decode JSON




$key = $_REQUEST['currentCountry'];


function findKey($json, $key) {
    $json_data = json_decode($json,true);
     foreach ($json_data['features'] as $geoFeature) {
         if (in_array($key, $geoFeature['properties'])) {
             $currentProperties=$geoFeature['geometry'];
             return  $currentProperties;
             }
     }
 }
 echo json_encode(findKey($json, $key));


?>