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

router.get('/:id', (req, res) => {
    console.log('find organizations by', req.params.id)
    Organization.findOne({
        id: req.params.id
    })
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
    Organization.create({
        orgName: req.body.orgName,
        contactPerson: req.body.contactPerson,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone
    })
        .then(organizations => {
            console.log('New organization =>>', organizations);
            res.json({ organizations: organizations });
        })
        .catch(error => {
            console.log('error', error)
            res.json({ message: "Error ocurred, please try again" })
        });
});


router.put("/:id", (req, res) => {
    Organization.findOneAndUpdate({
        orgName: req.body.orgName,
        contactPerson: req.body.contactPerson,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        createdAt: req.body.createdAt
    })
      .then((organizations) => {
        console.log("Updated org =>>",organizations);
        res.json({ organizations: organizations});
      })
      .catch((error) => {
        console.log("error", error);
        res.json({ message: "Error ocurred, please try again" });
      });
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
