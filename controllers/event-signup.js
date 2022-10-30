// Imports
require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { JWT_SECRET } = process.env;

// DB Models
const EventSignup = require("../models/event-signup");


router.get("/", (req, res) => {
    EventSignup.find({})
    .then((signups) => {
      console.log("All event signups", signups);
      res.json({ signups: signups });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error occured, please try again" });
    });
});

router.get("/:id", (req, res) => {
  console.log("find event signups by", req.params.id);
  EventSignup.findOne({
    id: req.params.id,
  })
    .then((signups) => {
      console.log("Here is the event signup", signups.id);
      res.json({ signups: signups });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
    });
});

router.post("/", (req, res) => {
    EventSignup.findOne({ userId: req.body.userId })
    .then(eventsignup => {
        if (eventsignup) {
            return res.status(400).json({ message: 'You already signed up!' });
        } else {
            const newSignup = new EventSignup({
                eventId: req.body.eventId,
                userId: req.body.userId
            })
        }
    })
    .catch(err => { 
        console.log('Error finding event signup', err);
        res.json({ message: 'Error occured... Please try again.'})
    })
});
//     EventSignup.create({
//     eventId: req.body.eventId,
//     userId: req.body.userId
//   })
//     .then((signups) => {
//       console.log("New event signup =>>", signups);
//       res.json({ signups: signups });

//     })
//     .catch((error) => {
//       console.log("error", error);
//       res.json({ message: "Error ocurred, please try again" });
//     });
// });

router.put("/:id", async(req, res) => {
    try {
        const data = await EventSignup.findById(req.params.id);
        res.json({ data: data });
    } catch (error) {
    console.log(error);
    }
});

router.delete("/:id", (req, res) => {
    EventSignup.findOneAndRemove({ id: req.params.id })
    .then((response) => {
      console.log("The signup was deleted", response);
      res.json({ message: `${req.params.id} was deleted` });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
    });
});

module.exports = router;
