// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models
const Hour = require('../models/hours');
const Opportunity = require('../models/opportunity');

router.get('/', passport.authenticate('jwt', { session: false }),(req, res) => {
    Hour.find({})
    .then(hours => {
        console.log('All hours', hours);
        res.json({ hours: hours });
    })
    .catch(error => { 
        console.log('error', error)
        res.json({ message: 'Error occured, please try again' });
    });
});

router.get('/:id', passport.authenticate('jwt', { session: false }),(req, res) => {
    console.log('find hours by', req.params.id)
    Hour.findOne({
        id: req.params.id
    })
    .then(hours => {
        console.log('Here is your sign-in', hours.id);
        res.json({ hours: hours });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

router.post('/:eventId', passport.authenticate('jwt', { session: false }),(req, res) => {
    Hour.create({
        signIn: req.body.signIn,
        signOut: req.body.signOut,
        eventId: mongoose.Types.ObjectId(req.params.eventId),
        userId: req.user._id,
    })
    .then(hours=> {
        Opportunity.findOneById(req.params.eventId)
        .then(opportunity=>{
            opportunity.hours.push(hours);
            opportunity.save();
        })
        .catch(error=>{
            console.log('error',error);
        })
        console.log('New sign in =>>', hours);
        res.json({ hours: hours });
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

router.put("/:id",passport.authenticate('jwt', { session: false }), async(req, res) => {
    try {
        const data = await Hour.findById(req.params.id);
        res.json({ data: data });
    } catch (error) {
    console.log(error);
}
});


router.delete('/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    Hour.findOneAndRemove({ id: req.params.id})
    .then(response => {
        console.log('This was deleted', response);
        res.json({ message: `${req.params.id} was deleted`});
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" });
    })
});

module.exports = router;