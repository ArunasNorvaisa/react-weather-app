# Weather application
Weather app made with ReactJS. Automatically recognizes user's location, based on browser's settings or IP. Weather can be searched both by location on the map or entering city in the search bar.

### Version
* 1.1.1

### Demo
* [https://reactweatherapp.com](https://reactweatherapp.com)

### Usage:
```sh
$ git clone git@github.com:ArunasNorvaisa/react-weather-app.git
$ cd react-weather-app
$ npm install -d
$ touch .env
```

* Get the API keys from [Google](https://developers.google.com/maps/documentation/javascript/get-api-key) and [Dark Sky](https://darksky.net/dev).
* Update .env file in the project root (that was created at the previous step) directory with the following content:

> REACT_APP_API_KEY_GL = INSERT_YOUR_GOOGLE_API_KEY<br>
> REACT_APP_API_KEY_DS = INSERT_YOUR_DARKSKY_API_KEY

```sh
$ npm build
```
* Open /build/index.html in your browser and, if everything works as intended,
* Upload contents of BUILD folder to your hosting provider.

##### Disclaimer
Information displayed in this web application cannot be used for commercial purposes. Weather info is [powered by Dark Sky](http://darksky.net/poweredby/).
