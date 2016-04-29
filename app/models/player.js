// Setting mongoose module
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// Build the player Model
var playerSchema = new Schema({
    name:   { type: String },
    points: { type: Number }
});

// Export Model to use in the app
module.exports = mongoose.model('Player', playerSchema);
