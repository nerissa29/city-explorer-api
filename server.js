'use strict';

console.log('My first server!!');

// Requires
// >>> bring in express library <<<
const express = require('express');
require('dotenv').config(); // >> bringing in dotenv

console.log('another one, yeheeyyy! Wohoo!');

// use express once it's in
const app = express();


// define my port
const PORT = process.env.PORT || 3002;

// Endpoints
// >>> Base endpoint <<<
app.get('/', (request, response) => {
  console.log('This is showing up in my terminal!');
  response.status(200).send('Welcome to my server!');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server!`);
});

// >>> catch all needs to live at the bottom of endpoint <<<
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist!');
});

// Error Handling
// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// })

// Server Start
app.listen(PORT, () => console.log(`Up and runing on ${PORT}`));
