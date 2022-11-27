const mongoose = require('mongoose');
const {
	Schema,
} = require('./mongooseConnection');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		maxLength: 50,
	},
	emailId: {
		type: String,
		maxLength: 50,
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
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
	reputation: {
		type: Number,
		default: 0,
	},
	greScore: {
		type: Schema.Types.Mixed,
	},
	ieltsScore: {
		type: Schema.Types.Mixed,
	},
	underGradPercent: {
		type: Number
	},
	location: {
		type: String,
	},
	// tagsInformation: {
	// 	type: Schema.Types.Mixed,
	// },
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
	lastSeen: {
		type: Date,
		default: Date.now,
	},
	reach: {
		type: Number,
		default: 0,
	},
	about: {
		type: String,
		maxLength: 20,
	},
	// badges: {
	// 	type: Schema.Types.Mixed,
	// },
	// bookmarks: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Question',
	// 	default: [],
	// }],
	isAdmin: {
		type: Boolean,
		default: false,
	},
	followedSpaces: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Space',
		default: [],
	}]
}, {
	minimize: false,
});

const User = mongoose.model('User', userSchema);

module.exports = User;