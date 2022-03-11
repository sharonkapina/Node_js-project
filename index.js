const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genre = require('./routes/genres');
const customer = require('./routes/customers');
const movies =require('./routes/movies');
const rental = require('./routes/rentals');
const auth = require('./routes/auth');
const users = require('./routes/users');

if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR:jwt private key not defined, ');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() =>console.log('connected to mongodb...'))
  .catch(err => console.error('could not connect to mongodb'));

// adding a piece of middleware
app.use(express.json());
app.use('/api/genres', genre);
app.use('/api/customers', customer);
app.use('/api/movies', movies);
app.use('/api/rentals', rental);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(3000, () =>{
    console.log(`listening to port ${port}...`);
});





