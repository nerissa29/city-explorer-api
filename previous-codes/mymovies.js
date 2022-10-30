'use strict';

// >>>>>>> From Lab 9 <<<<<<<<

const axios = require('axios');

async function getMovieData(request, response, next) {
  try {
    let city = request.query.city_name;

    // collaborated with TA Rogers, changed the '&city_name' to '&query'
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
    let movieData = await axios.get(url);
    let newMovieData = movieData.data.results.map(movie => {
      return new Movie(movie);
    });
    response.status(200).send(newMovieData);
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
