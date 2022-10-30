'use strict';

// >>>>>>>>>>>>> LAB 10 ading cache to movie.js sample <<<<<<<<<<<<<<<
const axios = require('axios');

let cache = {};

async function getMovieData(request, response, next) {
  try {
    let city = request.query.city_name;

    // >>>>> key creation for data to store <<<<<<
    let key = city + 'movieImage';

    // >>> setting up condition if data exists, and if under a valid timeframe (cache[key].timestamp)..if it is, send the data <<<

    if (cache[key] && Date.now() - cache[key].timestamp < 1.21e+9) { // 1.21e+9 millisecond >>> 2 weeks
      console.log('Cache was hit, movie data showing!');
      response.status(200).send(cache[key].data);
    } else {
      console.log('Cache missed! No movie data present');
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
      let movieData = await axios.get(url);

      let newMovieData = movieData.data.results.map(movie => {
        return new Movie(movie);
      });

      // >>>>>>> adding API return to cache <<<<<<
      cache[key] = {
        data: newMovieData,
        timestamp: Date.now()
      };

      // collaborated with TA Rogers, changed the '&city_name' to '&query'

      response.status(200).send(newMovieData);
    }

  } catch(error) {
    next(error);
  }
}

class Movie {
  constructor(movies) {
    this.title = movies.title;
    this.overview = movies.overview;
  }
}

module.exports=getMovieData;
