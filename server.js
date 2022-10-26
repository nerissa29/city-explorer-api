'use strict';

console.log('My first server!!');

// >>>> Requires <<<<<
// >>> bring in express library <<<
const express = require('express');
require('dotenv').config(); // >> bringing in dotenv
let data = require('./data/weather.json');
const cors = require('cors');

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
