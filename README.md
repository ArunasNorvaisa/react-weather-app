# Weather application
Weather app made with ReactJS. Automatically recognizes user's location, based on browser's settings or IP. Weather can be searched both by location on the map or entering city in the search bar.

Made using React hooks (useState, useEffect, useContext) and React context (absolutely unnecessary for a small application like this, but it was fun to learn).

### Version
* 3.0.1

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

* Get the API keys from [Google](https://developers.google.com/maps/documentation/javascript/get-api-key) and [Open Weather Map](https://openweathermap.org/api).
* Update .env file in the project root (that was created at the previous step) directory with the following content:

> REACT_APP_API_KEY_GL = INSERT_YOUR_GOOGLE_API_KEY<br>
> REACT_APP_API_KEY_OW = INSERT_YOUR_OPENWEATHERMAP_API_KEY

* Update ./proxy/env.json file with the following content:

```sh
{
  "REACT_APP_API_KEY_OW": "INSERT_YOUR_OPENWEATHERMAP_API_KEY"
}
```

* Update ./proxy/.htaccess file to reflect your referring domain

```sh
$ npm run build:prod
```
* Open /build/index.html in your browser and, if everything works as intended,
* Upload contents of BUILD folder to your hosting provider.
* If you have CORS/proxy related problems, read comments in /components/Weather.jsx to either enable or disable proxy.

### Support:

* Star the repo
* Create PR and make it better
* Say 'hello' - hello@reactweatherapp.com
