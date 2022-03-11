const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxtlength: 70

    }

});
const Genre = mongoose.model('Genre', genreSchema);

function validateGenres(genre){
    const schema = Joi.object({
       name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate=validateGenres;