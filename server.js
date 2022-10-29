'use strict';

require('dotenv');
const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
const app = express();

// used cors, bug fixed
// using cors/middleware to share resources across the internet
app.use(cors());

app.get('/weather', weatherHandler);

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
// added 1-line after end of code, bug fixed
app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
