const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('customer', new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength: 4,
        maxlength: 70
    },
    phone:{
        type: Number,
        required: true,
    },
    isGold:Boolean
}));

function validateCustomers(customers){
    const schema = Joi.object({
        name: Joi.string().min(5).max(70).required(),
        phone: Joi.number().integer().required(),
        isGold: Joi.boolean().required()
    });
   return schema.validate(customers);
}

exports.Customer = Customer;
exports.validate = validateCustomers;
