require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// import models
// const SuperHero = require('./models/superhero');


// connect to datbase
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
});


// SuperHero.create({
//     realName: 'Clark Kent',
//     alterEgo: 'Superman',
//     company: 'Marvel'
// })
// .then(superhero => {
//     console.log('NEW HERO', superhero);
// })
// .catch(error => {
//     console.log('ERROR', error);
// })

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Voluntiers' });
});

// ================ SUPERHEROS ROUTES ========================
// app.use('/superheros', require('./controllers/superheros'));

// ================ CREDIT CARDS ROUTES ========================
// app.use('/credits', require('./controllers/credits'));

// ================ VEHICLES ROUTES ========================
// app.use('/vehicles', require('./controllers/vehicles'));


app.get('*', (req, res) => {
    res.json({ message: 'Whatever you were looking for... does not exists.'})
})


app.listen(8000, () => {
    console.log('Running port 8000')
});