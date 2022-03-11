const{User} = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');


router.post('/', async (req, res) => {
    const{error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let user  = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('invalid email or password');

     const validPassword = await bcrypt.compare(req.body.password, user.password);
     if (!validPassword) return res.status(400).send('invalid email or password');

    const token = user.generateAuthToken();
     res.send(token)

});

function validate(req){
    const schema = Joi.object({
        email:Joi.string().min(7).max(255).required().email(),
        password:Joi.string().min(7).max(255).required()
    });
    return schema.validate(req);
}

module.exports= router;
