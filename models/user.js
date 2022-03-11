const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 60,
        required: true
    },
    email:{
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    password:{
        type:String,
        minlength: 5,
        maxlength: 1024,
        required:true
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token =  jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const NewUser = mongoose.model('user', userSchema);

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(80).required(),
        email:Joi.string().min(7).max(255).required().email(),
        password:Joi.string().min(7).max(255).required()
    });
    return schema.validate(user);
}

exports.User= NewUser;
exports.validate = validateUser;
