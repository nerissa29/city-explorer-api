'use strict';

const axios = require('axios');

async function getWeatherData(request, response, next) {
  try {
    console.log(request.query);

    let lat = request.query.lat;
    let lon = request.query.lon;

    let url = `http://api.weatherbit.io/v2.0/forecast/daily/weather?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=8&units=F`;

    let weatherResults = await axios.get(url);

    console.log('weather results is: ', weatherResults.data);
    console.log('lat', lat);
    console.log('lon', lon);


    // was accessing the data objects wrong, TA Adam helped me see it
    let forecastData = weatherResults.data.data.map(element => {
      return new Forecast(element);
    });
    // console.log(forecastData);


    response.status(200).send(forecastData);


  } catch(error) {
    console.log(error);
    next(error);
  }
}

class Forecast {
  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.datetime = weatherData.datetime;
  }
}

module.exports=getWeatherData;
