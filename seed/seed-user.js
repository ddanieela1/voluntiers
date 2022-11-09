require('dotenv').config();
const mongoose = require('mongoose');
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

const User = require('../models/user');
const { randFullName, randEmail } = require('@ngneat/falso');

// test fake data
// let newUser = randFullName();
// console.log('NEW USER', newUser); // print to make sure tha

// create a async function that will make an array of 100 persons
async function makeUsers() {
    // create an empty array
    const array = [];
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      const rndInt = randomIntFromInterval(10, 110)
      console.log(rndInt)

    // make for loop
    for (let i = 0; i < 10; i++) {
        let newUser = { name: randFullName(),
                        email: randEmail(),
                        password: 12345678,
                        hours: randomIntFromInterval(10, 110)
                      };
    
        // push it into the array
        array.push(newUser);
    }

    return array;
}

makeUsers()
.then(array => {
    console.log('NUMBER OF USERS', array);    
    // use insertMany function to create 10 users
    User.insertMany(array)
    .then(response => {
        console.log('RESPONSE FROM MONGODB', response);
    })
    .catch(error => {
        console.log(error);
    })
})
.catch(error => {
    console.log('ERROR', error);
});
