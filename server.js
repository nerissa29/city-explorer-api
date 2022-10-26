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

    // let searchQuery = request.query.searchQuery;


    let searchCityData = data.find(weather => weather.city_name === searchQuery);

    // let searchCityData = data.find(weather => weather.city_name === city_name);

    // let lat = request.query.searchCityData.lat;
    // let lon = request.query.searchCityData.lon;

    console.log('lat', lat);
    console.log('lon', lon);
    console.log(searchQuery);

    // console.log(searchCityData);



    let dataToSend = new Forecast(searchCityData);
    response.status(200).send(dataToSend);

    response.status(200).send(`${searchQuery}, ${lat}, ${lon}`);
    // response.status(200).send(`${searchQuery}`);


  } catch(error) {
    next(error);
  }
});

class Forecast {
  constructor(weatherData) {
    this.weatherData.data.weather.description = weatherData.data.weather.description;
    this.weatherData.data.datetime = weatherData.data.datetime;
  }

}




// >>> catch all needs to live at the bottom of endpoint <<<
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist!');
});


// >>>> Error Handling <<<<
// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// })

// >>>> Server Start <<<<
app.listen(PORT, () => console.log(`Up and runing on ${PORT}`));
