'use strict';

const axios = require('axios');

let cache = {};

async function getWeatherData(request, response, next) {
  try {
    console.log(request.query);

    let lat = request.query.lat;
    let lon = request.query.lon;

    // >>>>>>>> key creation for data to store <<<<<<<
    let key = lat + lon + 'weatherImage';

    // >>> setting up condition if data exists, and if under a valid timeframe (cache[key].timestamp)..if it is, send the data <<<
    if (cache[key] && Date.now() - cache[key] < 1.21e+9) { // 1.21e+9 millisecond >>> 2 weeks{
      console.log('Cache was hit, weather data showing');
      response.status(200).send(cache[key].data);
    } else {
      console.log('Cache was missed, no weather data present!');

      let url = `http://api.weatherbit.io/v2.0/forecast/daily/weather?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=8&units=F`;

      let weatherResults = await axios.get(url);

      // console.log('weather results is: ', weatherResults.data);
      console.log('lat', lat);
      console.log('lon', lon);


      // was accessing the data objects wrong, TA Adam helped me see it
      let forecastData = weatherResults.data.data.map(element => {
        return new Forecast(element);
      });

      // >>>>>>>>>>> add API return to cache <<<<<<<<<
      cache[key] = {
        data: forecastData,
        timestamp: Date.now()
      };

      response.status(200).send(forecastData);
    }


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
