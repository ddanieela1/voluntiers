require('dotenv').config();
const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
require('./config/passport')(passport);

//App Set Up
const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(passport.initialize());
//Database Set Up
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
});

//API ROUTES
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Voluntiers' });
});


  app.use('/events', require('./controllers/event'));
  app.use('/organizations', require('./controllers/organization'));
  app.use('/hours', require('./controllers/hours'));
  
  // Server
  const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
  
  module.exports = server;
  