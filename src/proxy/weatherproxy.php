<?php

// Send the CORS header
header("Access-Control-Allow-Origin: *");

// Get the API key
// !!! Update the path of env.json, do not store it in the same folder as this file !!!
$env = json_decode(file_get_contents("env.json"), true);
$api_key = $env["API_KEY_OW"];

// Get the latitude and longitude from URL params
$latitude  = $_GET["lat"];
$longitude = $_GET["lon"];

// Generate the URL
$weather_url = "https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&appid="
              . $api_key . "&lat=" . $latitude . "&lon=" . $longitude;

// Setup cURL
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL            => $weather_url,
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
