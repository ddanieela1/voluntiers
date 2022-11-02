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

router.get('/', (req, res) => {
    Organization.find({})
        .then(organizations => {
            console.log('All organizations', organizations);
            res.json({ organizations: organizations });
        })
        .catch(error => {
            console.log('error', error)
            res.json({ message: 'Error occured, please try again' });
        });
});

router.get('/:id', (req, res, next) => {
    console.log('find organizations by', req.params.id)
    Organization.findOne({
        id: req.params.id
    })
        .populate()
        .then(organizations => {
            console.log('Here is the organization', organizations.id);
            res.json({ organizations: organizations });
        })
        .catch(error => {
            console.log('error', error);
            res.json({ message: "Error ocurred, please try again" });
        });
});

router.post('/', (req, res) => {
    Organization.findOne({ orgName: req.body.orgName })
        .then(org => {
            // if email already exists, a user will come back
            if (org) {
                // send a 400 response
                return res.status(400).json({ message: 'Organization already exists' });
            } else {
                //check if organization already exists
                //if not then...
                Organization.create({
                    orgName: req.body.orgName,
                    contactPerson: req.body.contactPerson,
                    contactEmail: req.body.contactEmail,
                    contactPhone: req.body.contactPhone,
                    createdAt: req.body.createdAt
                })
                    .then(organizations => {
                        console.log('New organization =>>', organizations);
                        res.json({ organizations: organizations });
                    })
                    .catch(error => {
                        console.log('error', error)
                        res.json({ message: "Error ocurred, please try again" })
                    });
            }
        })
    });

    router.put('/:id', (req, res) => {

        Organization.findOne({ id: req.params.id })
            .then(foundOrganization => {
                console.log('Organization found', foundOrganization);
                Organization.findOneAndUpdate({ id: req.params.id }, {
                    orgName: req.body.name,
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

    router.delete('/:id', (req, res) => {
        Organization.findOneAndRemove({ id: req.params.id })
            .then(response => {
                console.log('This was deleted', response);
                res.json({ message: `${req.params.id} was deleted` });
            })
            .catch(error => {
                console.log('error', error)
                res.json({ message: "Error ocurred, please try again" });
            })
    });

    module.exports = router;
