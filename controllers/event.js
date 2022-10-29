// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models
const Event = require('../models/event');

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Events page' });
});

router.get('/events', (req, res) => {
    Event.find({})
    .then(events => {
        console.log('All events', events);
        res.json({ events: events });
    })
    .catch(error => { 
        console.log('error', error)
        res.json({ message: 'Error occured, please try again' });
    });
});

router.get('/events/:id', (req, res) => {
    console.log('find events by', req.params.id)
    Event.findOne({
        id: req.params.id
    })
    .then(events => {
        console.log('Here is the event', events.id);
        res.json({ events: events });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

router.post('/events', (req, res) => {
    Event.create({
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        startTime: req.body.time,
        endTime: req.body.endTime,
        users: req.body.users,
        organizationId: req.body.organizationId,
    })
    .then(events=> {
        console.log('New event =>>', events);
        res.json({ events: events });
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

router.put('/events/:id', (req, res) => {
  
    Event.findOne({ id: req.params.id })
    .then(foundEvent=> {
        console.log('Event found', foundEvent);
        Event.findOneAndUpdate({ id: req.params.id}, { 
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        startTime: req.body.time,
        endTime: req.body.endTime,
        users: req.body.users,
        organizationId: req.body.organizationId,
        }, { 
            upsert: true 
        })
        .then(events => {
            console.log('Event was updated', events);
            res.json({ events: events })
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

router.delete('/events/:id', (req, res) => {
    Event.findOneAndRemove({ id: req.params.id})
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