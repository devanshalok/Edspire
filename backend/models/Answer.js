const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const answerSchema = new mongoose.Schema({
	questionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question',
		required: true,
	},
	createdBy: {
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		
		firstname:{
			type:String,
			default:"Anonymous"
		},
		lastname:{
			type:String,
			default:"Mozart"
		},
		imageUrl: {
			type: String,
			maxLength: 100,
			default: ""
		},
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	answer: {
		type: String,
		required: true,
	},
	votes: {
		type: Number,
		default: 0,
	},
	isBestAnswer: {
		type: Boolean,
		default: false,
	},
});

const Answer = mongooseConnection.model('Answer', answerSchema);

module.exports = Answer;