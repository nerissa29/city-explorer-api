'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
// require/added movie
const movies = require('./modules/movies.js');

const app = express();
const PORT = process.env.PORT;

// used cors, bug fixed
// using cors/middleware to share resources across the internet
app.use(cors());

app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    // indentation needed, bug fixed
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      // semi-colon bug fixed
      response.status(200).send('Sorry. Something went wrong!');
    });
}

function movieHandler(request, response) {
  const {city} = request.query;
  movies(city)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry, something went wrong on movies!');
    });

}

// added 1-line after end of code, bug fixed
app.listen(PORT, () => console.log(`Server up on ${PORT}`));
