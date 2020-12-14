// Load dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import seed data
const dbSeed = require(`./seeds/characters.js`);
// console.log(dbSeed[1]);


// Define model
const Character = require(`./models/character.js`);

// Mongoose/MongoDb Connection

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`);
});

db.once('open', function() {
  console.log('Connected to DB...');
});

// Insert Many
Character.insertMany(dbSeed, function(error, character) {
  console.log('Data import completed.')
  mongoose.connection.close();
});

// Insert One
// Variabe to store last document/object added to seeds
// let insert = dbSeed[dbSeed.length-1];
// Character.create(insert, function(error, character) {
//   console.log('Data import completed.')
//   mongoose.connection.close();
// });