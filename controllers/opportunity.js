// Imports
require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { JWT_SECRET } = process.env;

// DB Models
const Opportunity = require("../models/opportunity");
const { Router } = require("express");

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


// router.get("/currentOpportunities", (req, res) => {
//   console.log("find opportunities by", req.params.date);{
//     let dateNow;
//     if(dateNow.getTime() >= date){
//       return req.params.name
//     }
//   }
//     .then((opportunities) => {
//       console.log("Here is the event", opportunities.date);
//       res.json({ opportunities: opportunities });
//     })
//     .catch((error) => {
//       console.log("error", error);
//       res.json({ message: "Error ocurred, please try again" });
//     });
// });


// router.get("/pastOpportunities", (req, res) => {
//   console.log("find opportunities by", req.params.date);{
//     if(date.getTime() <= date){
//       return req.params.name
//     }
//   }
//     .then((opportunities) => {
//       console.log("Here is the event", opportunities.date);
//       res.json({ opportunities: opportunities });
//     })
//     .catch((error) => {
//       console.log("error", error);
//       res.json({ message: "Error ocurred, please try again" });
//     });
// });


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
    hours: req.body.hours,
    organizationId: req.body.organizationId,
  })
    .then((opportunities) => {
      console.log("New event =>>", opportunities);
      res.json({ opportunities: opportunities });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ message: "Error ocurred, please try again" });
    });
});

router.put("/:id", async(req, res) => {
    try {
        const data = await Opportunity.findById(req.params.id);
        res.json({ data: data });
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
