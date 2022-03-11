const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');


const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type:String,
        minlength: 5,
        maxlength: 200,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true,
        min: 0,
        max: 200
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 200
    }

}));

function validateMovies(movie){
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().integer().required(),
        dailyRentalRate: Joi.number().integer().required()
    });
    return schema.validate(movie);

}

exports.Movie = Movie;
exports.validate = validateMovies;
