'use strict';

// require cache
let cache = require('./cache.js');

// require axios
const axios = require('axios');

function getMovieData(city_name) {
  // declare variable to hold cityName value
  let city = city_name;

  const key = 'movies-' + city;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;

  if (cache[key] && Date.now() - cache[key].timestamp < 6.6138e-9) { // 6.6138e-9 milliseconds >>> 4 weeks
    console.log('Cache hit');
  } else {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovie(response.data)); // response.data <<<<<<<<<<<<<<
  }
  console.log('cache[key].data', cache[key].data);
  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    const movieDataInfo = movieData.results.map(movie =>{ // movieData.results.map
      console.log('movieData', movieData);
      return new Movie(movie);
    });
    return Promise.resolve(movieDataInfo);
  } catch (error) {
    return Promise.reject(error);
  }

}


class Movie {
  constructor(movies) {
    this.title = movies.title;
    this.overview = movies.overview;
    this.timestamp = Date.now();
  }
}
module.exports = getMovieData;
