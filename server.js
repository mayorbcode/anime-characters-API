// Load dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import models
const Characters = require('./models/character.js');

// Create express app
const app = express();

// Enable all cors requests
app.use(cors()); 

// Set up mongoose connection
mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true,useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log('Connected to DB...');
});

//"Home page" endpoint
app.get('/', (req, res) => {
  res.send(`<h1>Welcome!</h1><p>Add '/api/v0/:animeName' to the current endpoint/url to return an array of objects.</p><h2>or</h2><p>Add '/api/v0/:animeName/:characterName' to return an object with the specified animeName and characterName.</p>`);
});

// JSON endpoint. Returns array of objects
app.get('/api/v0/:anime', (req, res) => {
  let animeName = req.params.anime;
  Characters.find({animeQuery: animeName}, (err, data) => {
    if (err || data.length===0) {
      res.send('Could not find anime');
      console.log(err);
    }
    else {
      res.json(data);
    }
  });
});

// JSON endpoint. Returns object with the specified query parameters
app.get('/api/v0/:anime/:name', (req, res) => {
  let animeName = req.params.anime;
  let characterName = req.params.name;
  Characters.findOne({animeQuery: animeName, nameQuery: characterName}, (err, data) => {
    if (err || data===null) {
      res.send('Could not find character');
      // console.log(err);
    }
    else {
      res.json(data);
    }
  });
});

// Add more middleware for if other endpoints fail
app.use((req, res, next) => {
  res.status(404);
  res.send('404: File Not Found');
});

// Set port preferrence with default
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});
