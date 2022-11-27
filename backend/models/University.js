const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const universitySchema = new mongoose.Schema({
    name: {type: String, required: true},
    createdOn: { type: Date, default: Date.now },
    location: {type: String, required: true},
    minGre: {type: Number, required: true},
    maxGre: {type: Number, required: true},
    minPercent: {type: Number, required: true},
    maxPercent: {type: Number, required: true},
});

const University = mongooseConnection.model('University', universitySchema);

module.exports = University;