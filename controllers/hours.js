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

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the home page' });
});

router.get('/hours', (req, res) => {
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

router.get('/hours/:id', (req, res) => {
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

router.post('/hours', (req, res) => {
    Hour.create({
        signIn: req.body.signIn,
        signOut: req.body.signOut,
    })
    .then(hours=> {
        console.log('New sign in =>>', hours);
        res.json({ hours: hours });
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

router.put('/hours/:id', (req, res) => {
  
    Hour.findOne({ id: req.params.id })
    .then(foundHours=> {
        console.log('Sign-in found', foundHours);
        Hour.findOneAndUpdate({ id: req.params.id}, { 
            signIn: req.body.signIn,
            signOut: req.body.signOut,
        }, { 
            upsert: true 
        })
        .then(hours => {
            console.log('Sign-in was updated', hours);
            res.json({ hours: hours })
        })
        .catch(error => {
            console.log('error', error) 
            res.json({ message: "Error ocurred, please try again" })
        })
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    })
});

router.delete('/hours/:id', (req, res) => {
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
