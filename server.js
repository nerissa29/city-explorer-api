'use strict';

console.log('My first server!!');

// >>>> Requires <<<<<
// >>> bring in express library <<<
const express = require('express');
require('dotenv').config(); // >> bringing in dotenv
const cors = require('cors');
const axios = require('axios');


// use express once it's in
const app = express();

// using cors/middleware to share resources across the internet
app.use(cors());

// define my port
const PORT = process.env.PORT || 3002;


// >>>> Endpoints <<<<
// Base endpoint
app.get('/', (request, response) => {
  console.log('This is showing up in my terminal!');
  response.status(200).send('Welcome to my server!');
});




// http://api.weatherbit.io/v2.0/forecast/daily?key=<your API key>&lat=<from your frontend>&lon=<from your frontend>&day=5&units=F

app.get('/weather', async (request, response, next) => {
  try {
    console.log(request.query);

    let lat = request.query.lat;
    let lon = request.query.lon;

    let url = `http://api.weatherbit.io/v2.0/forecast/daily/weather?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&day=7&units=F`;

    let weatherResults = await axios.get(url);


    console.log('weather results is: ', weatherResults.data);
    console.log('lat', lat);
    console.log('lon', lon);


    // was accessing the data objects wrong, TA Adam helped me see it
    let forecastData = weatherResults.data.data.map(element => {
      return new Forecast(element);
    });
    console.log(forecastData);


    response.status(200).send(forecastData);


  } catch(error) {
    console.log(error);
    next(error);
  }
});


class Forecast {
  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.datetime = weatherData.datetime;
  }
}




// >>> catch all needs to live at the bottom of endpoint <<<
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist!');
});


// >>>> Error Handling <<<<
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// >>>> Server Start <<<<
app.listen(PORT, () => console.log(`Up and runing on ${PORT}`));





// ...................................................................................
//        >>>>>>>>>>>>>>>>>>  For Lab 07 <<<<<<<<<<<<<<<<<<
// ..................................................................................


/*

app.get('/weather', (request, response, next) => {
  try {
    console.log(request.query);

    let searchQuery= request.query.city_name;
    let lat = request.query.lat;
    let lon = request.query.lon;

    let searchCityData = data.find(weather => weather.city_name === searchQuery);


    console.log('lat', lat);
    console.log('lon', lon);
    console.log(searchQuery);

    console.log(searchCityData);

    // line 50-53 collaborated with TA Adam, removing/changing line 55 for easy parsing
    let newArr = searchCityData.data.map(element => {
      return new Forecast(element);
    });

    // let dataToSend = new Forecast(newArr); // replaced by line 46


    response.status(200).send(newArr);


  } catch(error) {
    next(error);
  }
});


class Forecast {
  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.datetime = weatherData.datetime;
  }
}


*/
