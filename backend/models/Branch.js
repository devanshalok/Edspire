const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 100,
        default: ""
    },
    level: {
        type: String,
        enum: ['Bachelors','Masters'],
        default: "Masters"
    },
});


const Branch = mongooseConnection.model('Branch', branchSchema);

module.exports = Branch;