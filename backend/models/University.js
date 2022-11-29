const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const universitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    descr: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    undergraduateCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
        default: []
    }],
    graduateCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
        default: []
    }],
    isBranchChangeAllowed: { type: Boolean, required: true, default: true },
    isPublic: { type: Boolean, required: true, default: true },
    feePerSem: { type: Number, required: true, default: true },
    minGre: { type: Number, required: true, default: 0 },
    maxGre: { type: Number, required: true, default: 0 },
    minIelts: { type: Number, required: true, default: 0 },
    maxIelts: { type: Number, required: true, default: 0 },
    minPercent: { type: Number, required: true, default: 0 },
    maxPercent: { type: Number, required: true, default: 0 },
    workExperienceYears: { type: Number, required: true, default: 0 },
    backlogs: { type: Number, required: true, default: 0 },
    createdOn: { type: Date, default: Date.now },
});

const University = mongooseConnection.model('University', universitySchema);

module.exports = University;