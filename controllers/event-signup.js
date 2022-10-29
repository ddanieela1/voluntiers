const express = require('express');
const router = express.Router();
const EventSignup = require('../models/event-signup');
const passport = require('passport');

// put this inside route to authenticate -> passport.authenticate('jwt', { session: false })

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Purpose: Fetch all examples from DB and return
    console.log('=====> Inside GET /event-signup');

    EventSignup.findById(req.params.id)
    .then(foundEventSignups => {
        res.json({ eventSignups: foundEventSignups });
    })
    .catch(err => {
        console.log('Error in example#index:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});

router.get('/query', (req, res) => {
    // Purpose: Fetch one example by searching in DB and return
    console.log('=====> Inside GET /examples/query');
    console.log('=====> req.query', req.query);

    EventSignup.find(req.query)
    .then(eventSignup => {
        res.json({ eventSignup: eventSignup });
    })
    .catch(err => {
        console.log('Error in eventSignup#query:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});

router.get('/:id', (req, res) => {
    // Purpose: Fetch one example from DB and return
    console.log('=====> Inside GET /examples/:id');

    EventSignup.findById(req.params.id)
    .then(e => {
        res.json({ eventSignup: eventSignup });
    })
    .catch(err => {
        console.log('Error in eventSignup#show:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});


router.post('/', (req, res) => {
    // Purpose: Create one example by adding body to DB, and return
    console.log('=====> Inside POST /examples');
    console.log('=====> req.body', req.body); // object used for creating new example

    EventSignup.create(req.body)
    .then(newSignup => {
        console.log('New signup created', newSignup);
        res.redirect(`/eventSignup/${newSignup.id}`);
    })
    .catch(err => {
        console.log('Error in signup#create:', err);
        res.json({ message: 'Error occured... Please try again.'});
    })
});



router.put('/:id', (req, res) => {
    // Purpose: Update one example in the DB, and return
    console.log('=====> Inside PUT /event-signup/:id');
    console.log('=====> req.params', req.params); // object used for finding event signup by id
    console.log('=====> req.body', req.body); // object used for updating event-signup

    Example.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedEventSignup => {
        console.log('EventSignup updated', updatedEventSignup);
        //update updatedAt for current eventSignup
        res.redirect(`/event-signup/${req.params.id}`);
    })
    .catch(err => {
        console.log('Error in example#update:', err);
        res.json({ message: 'Error occured... Please try again.'});
    });
});

router.delete('/:id', (req, res) => {
    // Purpose: Update one example in the DB, and return
    console.log('=====> Inside DELETE /examples/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding example by id
    
    Example.findByIdAndRemove(req.params.id)
    .then(response => {
        console.log(`Event Signup ${req.params.id} was deleted`, response);
        res.redirect(`/event-signup`);
    })
    .catch(err => {
        console.log('Error in example#delete:', err);
        res.json({ message: 'Error occured... Please try again.'});
    });
});

module.exports = router;