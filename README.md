# Weather application
<img src="https://arunas.org/2020_11_03_12_31_54_React_Weather_App_Opera.png" alt="React weather app" style="width:500px;margin:10px auto" />

Weather app made with ReactJS. Automatically recognizes user's location, based on browser's settings or IP. Weather can be searched both by location on the map or entering city in the search bar.

Made using React hooks (useState, useEffect, useContext) and React context (absolutely unnecessary for a small application like this, but it was fun to learn).

### Version
* 3.1.0

### Demo
* [https://reactweatherapp.com](https://reactweatherapp.com)

### Usage:
```sh
$ git clone git@github.com:ArunasNorvaisa/react-weather-app.git
$ cd react-weather-app
$ npm i -d (OR $ yarn)
$ touch .env
$ touch ./proxy/env.json
```

* Get 2 (two) API keys from 
[Google](https://developers.google.com/maps/documentation/javascript/get-api-key)
and 1 (one) from [Open Weather Map](https://openweathermap.org/api).
* Update .env file in the project root (that was created at the previous step) directory with the following content:

> API_KEY_GOOGLE_GEOCODING = YOUR_GOOGLE_GEOCODING_API_KEY<br>
> API_KEY_GOOGLE_MAPS = YOUR_GOOGLE_MAPS_API_KEY<br>
> API_KEY_OW = YOUR_OPENWEATHERMAP_API_KEY

This will prevent keys to be uploaded to the git repository, however anyone
 with at least half of the brain still be able to see them in plain text. 

##### If (and ONLY if) you care about security of your API keys:

We'll be using 2 PHP proxies to access the Openweathermap and Google geocoding
 services from the backend, so the keys wouldn't be exposed to anyone who
  knows how to use browser's dev tools. 

* Update ./proxy/env.json file with the following content (please note the
 quotes - they are required here, unlike in `.env`):

```sh
{
  "API_KEY_GOOGLE_GEOCODING" = "YOUR_GOOGLE_GEOCODING_API_KEY"
  "API_KEY_OW": "YOUR_OPENWEATHERMAP_API_KEY"
}
```

* Update ./proxy/.htaccess file to reflect your referring domain.
* Read comments in /components/Weather.jsx and /components/App.jsx to either
 enable or disable proxy.
 
 ### Run your App:
 
 ```sh
 $ npm run start (OR $yarn run start)
 ```
App will be accessible at `http://localhost:8080`

### Build your App:

```sh
$ npm run build:prod (OR $yarn run build:prod)
```
* Open /build/index.html in your browser and, if everything works as intended,
* Upload contents of BUILD folder to your hosting provider.

### Support:

* Star the repo
* Create PR and make it better
* Say 'hello' - hello@reactweatherapp.com
