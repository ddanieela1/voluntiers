// Imports
require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const lo = require("lodash");

const { JWT_SECRET } = process.env;

// DB Models
const Opportunity = require("../models/opportunity");
const User = require("../models/user");


router.get("/", (req, res) => {
  Opportunity.find({})
    .then((opportunities) => {
      console.log("All opportunities", opportunities);
      res.json({ opportunities: opportunities });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error occured, please try again" });
    });
});

router.get("/past", (req, res) => {
  Opportunity.find({
    date: {
      $lt: new Date()
    }
  })
    .then((opportunities) => {
      console.log("Here are the past events", opportunities);
      res.json({ opportunities: opportunities });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
    });
});

router.get("/:id", (req, res) => {
  console.log("find opportunities by", req.params.id);
  Opportunity.findOne({
    id: req.params.id,
  })
    .then((opportunities) => {
      console.log("Here is the event", opportunities.id);
      res.json({ opportunities: opportunities });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
    });
});

router.get("/currentopportunities", (req, res) => {
  Opportunity.find({
    $gte: new Date(),
  })
    .then((opportunities) => {
      console.log("Here is the event", opportunities.date);
      res.json({ opportunities: opportunities });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
    });
});

router.get("/pastopportunities", (req, res) => {
  Opportunity.find({
    $lt: new Date(),
  })
    .then((opportunities) => {
      console.log("Here is the event", opportunities.date);
      res.json({ opportunities: opportunities });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
    });
});

router.post("/", (req, res) => {
  Opportunity.create({
    name: req.body.name,
    date: req.body.date,
    location: req.body.location,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    description: req.body.description,
    users: req.body.users,
    categories: req.body.categories,
    organizationId: req.body.organizationId,
  })
    .then((opportunity) => {
      console.log("New event =>>", opportunity);
      res.json({ opportunity });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
    });
});

router.put("/:id", (req, res) => {
  Opportunity.findOneAndUpdate({
    name: req.body.name,
    date: req.body.date,
    location: req.body.location,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    description: req.body.description,
    users: req.body.users,
    categories: req.body.categories,
    hours: req.body.hours,
    organizationId: req.body.organizationId,
  })
    .then((opportunities) => {
      console.log("Updated opp =>>", opportunities);
      res.json({ opportunities: opportunities });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
   
});

router.put("/register/:id", async (req, res) => {
  try {
    console.log(`Trying to get user: ${req.body}`);
    const found_user = await User.findOne(req.body);
    if (!found_user) { throw new Error(`No user found`); }
    console.log(found_user);
    console.log(`Found User with ID ${found_user._id}`);
    console.log(`HEEEEEELLLLLLLP>>>>>>>>>, ${req.params.id}`)
    const data = await Opportunity.findById({_id: req.params.id});
    data.users.push(found_user._id);
    data.save();
    console.log(data);
    res.json({ data });

  } catch (error) {
    console.log(error);
  }
});

router.put("/remove/:id", async (req, res) => {
  try {
    console.log(`Trying to get user: ${req.body}`);
    const found_user = await User.findOne(req.body);
    if (!found_user) { throw new Error(`No user found`); }
    console.log(found_user);
    console.log(`Found User with ID ${found_user._id}`);
    console.log(`HEEEEEELLLLLLLP>>>>>>>>>, ${req.params.id}`)
    const data = await Opportunity.updateOne({_id: req.params.id}, { $pull: { users: `${found_user.id}` } });
    console.log(data);
    res.json({ data });

  } catch (error) {
    console.log(error);
  }
   });



router.delete("/:id", (req, res) => {
  Opportunity.findOneAndRemove({ id: req.params.id })
    .then((response) => {
      console.log("This was deleted", response);
      res.json({ message: `${req.params.id} was deleted` });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
    });
});

module.exports = router;
