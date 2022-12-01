const mongoose = require('mongoose');
const {
	Schema,
} = require('./mongooseConnection');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		maxLength: 50,
	},
	lastName: {
		type: String,
		maxLength: 50,
	},
	emailId: {
		type: String,
		maxLength: 50,
	},
	password: {
		type: String,
		minLength: 8,
	},
	imageUrl: {
		type: String,
		maxLength: 100,
	},
	location: {
		type: String,
		maxLength: 20,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	modifiedOn: {
		type: Date,
		default: Date.now,
	},
	greScore: {
		type: Number
	},
	ieltsScore: {
		type: Number
	},
	underGradPercent: {
		type: Number
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	country: {
		type: String,
	},
	university: {
		type: String,
	},
	followedUniversities: [{
		type: String,
	}],
	backlogs: {
		type: Number,
		default: 0,
	},
	workExperienceYears: {
		type: Number,
		default: 0,
	},
	branch: {
		type: String
	},
	desiredGraduateBranch: {
		type: String
	},
	questionsAsked: {
		type: Number,
		default: 0,
	},
	answersGiven: {
		type: Number,
		default: 0,
	},
	upvotesGiven: {
		type: Number,
		default: 0,
	},
	downvotesGiven: {
		type: Number,
		default: 0,
	},
	commentsGiven: {
		type: Number,
		default: 0,
	},
	upVotes:[{
		type: mongoose.Schema.Types.ObjectId,
		ref:'Answer',
		default: [],
	}],
	downVotes:[{
		type: mongoose.Schema.Types.ObjectId,
		ref:'Answer',
		default: [],
	}],
	lastSeen: {
		type: Date,
		default: Date.now,
	},
	about: {
		type: String,
		maxLength: 20,
	},
	linkedIn: {
		type: String,
	},
	twitter: {
		type: String,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	followedSpaces: [{ type: String }
	],
	followedQuestions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question',
		default: [],
	}]
}, {
	minimize: false,
});

const User = mongoose.model('User', userSchema);

module.exports = User;