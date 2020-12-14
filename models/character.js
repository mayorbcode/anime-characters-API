// Load dependency
const mongoose = require('mongoose');

// Define schema

const characterSchema = new mongoose.Schema(
  {
    id:             Number,
    anime:          String,
    name:           String,
    role:           String,
    description:    String,
    bounty:         String,
    wiki:           String,
    animeQuery:     String
  }
);

// Export module
module.exports = mongoose.model('Character', characterSchema);