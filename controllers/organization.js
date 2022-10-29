// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models
const Organization = require('../models/organization');

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Organizations page' });
});

router.get('/organizations', (req, res) => {
    Event.find({})
    .then(organizations => {
        console.log('All organizations', organizations);
        res.json({ organizations: organizations });
    })
    .catch(error => { 
        console.log('error', error)
        res.json({ message: 'Error occured, please try again' });
    });
});

router.get('/organizations/:id', (req, res) => {
    console.log('find organizations by', req.params.id)
    Organization.findOne({
        id: req.params.id
    })
    .then(organizations => {
        console.log('Here is the organization', organizations.id);
        res.json({organizations:organizations });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

router.post('/organizations', (req, res) => {
    Organization.create({
        name: req.body.name,
        contactPerson: req.body.contactPerson,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        createdAt: req.body.createdAt
    })
    .then(organizations=> {
        console.log('New organization =>>', organizations);
        res.json({ organizations: organizations });
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

router.put('/organizations/:id', (req, res) => {
  
    Organization.findOne({ id: req.params.id })
    .then(foundOrganizarion=> {
        console.log('Organization found', foundOrganizarion);
        Organization.findOneAndUpdate({ id: req.params.id}, { 
            name: req.body.name,
            contactPerson: req.body.contactPerson,
            contactEmail: req.body.contactEmail,
            contactPhone: req.body.contactPhone,
            createdAt: req.body.createdAt
        }, { 
            upsert: true 
        })
        .then(organizations => {
            console.log('Organization was updated', organizations);
            res.json({ organizations: organizations })
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

router.delete('/organization/:id', (req, res) => {
    Organization.findOneAndRemove({ id: req.params.id})
    .then(response => {
        console.log('This was deleted', response);
        res.json({ message: `${req.params.id} was deleted`});
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" });
    })
});
