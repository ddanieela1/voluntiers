require("dotenv").config();
const express = require("express");
const router = express.Router();

const Contact = require("../models/contact");

router.get("/", (req, res) => {
    Contact.find({})
    .then((contacts) => {
        console.log("All messages sent via contact form", contacts);
        res.json({ contacts: contacts });
    })
    .catch((error) => {
        console.log("error", error);
        res.json({ message: "Error occured retrieving messages. Please try again"});
    });
});

router.get("/:id", (req, res) => {
    console.log("find contacts by", req.params.id);
    Contact.findOne({
      id: req.params.id,
    })
      .then((contacts) => {
        console.log("Here is the contact message", contacts.id);
        res.json({ contacts: contacts });
      })
      .catch((error) => {
        console.log("error", error);
        res.json({ message: "Error ocurred, please try again" });
      });
  });

  router.post("/", (req, res) => {
    Contact.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    })
      .then((contacts) => {
        console.log("New Contact Message =>>", contacts);
        res.json({ contacts: contacts });
  
      })
      .catch((error) => {
        console.log("error", error);
        res.json({ message: "Error ocurred, please try again" });
      });
  });

  router.put('/:id', (req, res) => {
    // Purpose: Update one contact message in the DB, and return
    console.log('=====> Inside PUT /contactus/:id');
    console.log('=====> req.params', req.params); // object used for finding example by id
    console.log('=====> req.body', req.body); // object used for updating example

    Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedContact => {
        console.log('Contact updated', updatedContact);
        res.redirect(`/contactus/${req.params.id}`);
    })
    .catch(err => {
        console.log('Error in contact#update:', err);
        res.json({ message: 'Error occured... Please try again.'});
    });
});

router.delete("/:id", (req, res) => {
    Contact.findOneAndRemove({ id: req.params.id })
    .then((response) => {
      console.log("The contact message was deleted", response);
      res.json({ message: `Your contact message (${req.params.id}) was deleted` });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
    });
});

module.exports = router;