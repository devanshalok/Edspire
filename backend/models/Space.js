const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const spaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, require:true},
    headerImageUrl: { type: String, required: true },
    backgroundImageUrl: { type: String, required: true },
    followersCount: { type: Number, default: 0 },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
        default: []
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }]
});

const Space = mongooseConnection.model('Space', spaceSchema);

module.exports = Space;