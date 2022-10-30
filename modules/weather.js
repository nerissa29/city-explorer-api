'use strict';

let cache = require('./cache.js');
// bug fixed, axios defined
const axios = require('axios');

function getWeatherData(latitude, longitude) {
  // declaring lat/lon variable, bug fixed
  let lat = latitude;
  let lon = longitude;

  const key = 'weather-' + lat + lon;
  // added *process.env.*, bug fixed
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      // added indentation, bug fixed
      .then(response => parseWeather(response.data));
  }
  // trailing spaces deleted, bug fixed
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  // changed property names for easy reading
  constructor(day) {
    this.description = day.weather.description;
    this.datetime = day.datetime;
    this.timestamp = Date.now();
  }
}
// new line added at end of file, bug fixed
module.exports = getWeatherData;
