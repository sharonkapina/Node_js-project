const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const{Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    
    try {
        const genre = await Genre.find().sort('genre');
        res.send(genre);
    }
    catch(ex) {
        next(ex);
    }
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404). send('the movie with the given ID not found');
    res.send(genre);

});

router.post('/', auth, async (req, res) => {

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });
    await genre.save();
    res.send(genre);

});

router.put('/:id', async (req, res) => { 

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre =  await Genre.findByIdAndUpdate(req.params.id, {genre:req.body.name }, {
        new: true
    });
    if (!genre) return res.status(404). send('the movie with the given ID not found');

    res.send(genre);
});

router.delete('/:id',[auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404). send('the movie with the given ID not found');
    res.send(genre);
     
});
 
module.exports = router;