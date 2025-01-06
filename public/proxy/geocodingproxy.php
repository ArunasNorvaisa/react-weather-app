<?php

// Send the CORS header
header("Access-Control-Allow-Origin: *");

// Get the API key
// !!! Update the path of env.json, do not store it in the same folder as this file !!!
$env = json_decode(file_get_contents("env.json"), true);
$api_key = $env["API_KEY_GOOGLE_GEOCODING"];

// Get the latitude and longitude from URL params
$lat = $_GET["lat"];
$lng = $_GET["lng"];
$address = $_GET["address"];

// Generate the URL
$geocoding_url = "https://maps.googleapis.com/maps/api/geocode/json?key=" . $api_key;

if (!$lat) {
  $geocoding_url .= "&address=" . urlencode($address);
} else {
  $geocoding_url .= "&latlng=" . $lat . "," . $lng;
}

// Setup cURL
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL            => $geocoding_url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FAILONERROR    => true
));

// Make the API call
$result = curl_exec($curl);
if(!$result) {
  header('Content-type: application/json');
  die(json_encode(array('error' => curl_error($curl))));
}

curl_close($curl);

// Return the resulting JSON
header('Content-type: application/json');
echo $result;
