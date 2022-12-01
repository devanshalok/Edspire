const {
	log,
} = require('console');
const _ = require('lodash');
const Question = require('../models/Question');
const User = require('../models/User');
const Answer = require('../models/Answer');
const Space = require('../models/Space');
async function postQuestion(body, user) {
	//check that space id is passed in.
	console.log('user passed', user)
	const createdBy = {
		_id: user._id,
		firstname: user.firstName,
		lastname: user.lastName
	};
	body.createdBy = createdBy;
	const newQuestion = await Question.create(body);
	const space = await Space.findById(body.space).lean();
	space.questions.push(newQuestion._id);
	const questionResponse = await Space.updateOne({
		_id: body.space,
	}, {
		$set: space,
	}).exec();
	const userUpdate = await User.updateOne({ _id: user._id }, { $inc: { questionsAsked: 1 } });
	console.log('newquestion', newQuestion);
	return { 'statusCode': 200, data: { msg: "Question successfully created" } };
}

async function getQuestion(_id) {
	if (_id && _id!='undefined') {
		const question = await Question.findOne({ _id }).populate('answers');
		console.log('question', question);
		return { 'statusCode': 200, data: { question } };
	} else {
		return { 'statusCode': 400, error: { msg: "Bad data" } };
	}
}

async function getAllQuestions(space, _id) {
	let questions;
	if (space) {
		const spaceR = await Space.find({name:space})
		.populate(['questions','followers']);
		console.log('space',spaceR);
		return { 'statusCode': 200, data: spaceR  };

		// questions = await Question.find({ space });
	} else {
		questions = await Question.find({ "createdBy._id": { $ne: _id } });
	}
	console.log('all questions', questions);
	return { 'statusCode': 200, data: { questions } };
}

const getAnswersByQuestionId = async (params) => {
	console.log('Entering answerService.getAnswersByResourceId');
	try {
		let answers = await Answer.find({
			questionId: params.questionId,
		}).lean();
		console.log(`get answer response :${answers}`);
		return { 'statusCode': 200, data: { answers } };
	} catch (e) {
		console.error('Exception occurred while getting answers', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const addAnswer = async (body, user) => {
	console.log(`Entering answerService.addAnswer,payload is ${body}`);
	try {
		const createdBy = {
			_id: user._id,
			firstname: user.firstName,
			lastname: user.lastName
		};
		body.createdBy = createdBy;
		const answerResponse = await Answer.create(body);
		console.log(`add answer response :${answerResponse}`);
		const question = await Question.findById(body.questionId).lean();
		question.answers.push(answerResponse._id);
		question.isUnAnswered = false;
		const questionResponse = await Question.updateOne({
			_id: body.questionId,
		}, {
			$set: question,
		}).exec();
		const userUpdate = await User.updateOne({ _id: user._id }, { $inc: { answersGiven: 1 } });
		if (answerResponse && questionResponse) {
			return { statusCode: 200, data: { msg: 'Answer added successfully' } }
		}
		return {
			error: {
				msg: 'Some error occured while creating answer',
			},
			statusCode: 400
		};
	} catch (e) {
		console.error('Exception occurred while creating answer', e);
		return {
			error: {
				msg: e.message,
			},
			statusCode: 400
		};
	}
};

const updateAnswer = async ({
	params,
	body,
}) => {
	console.log(`Entering answerService.updateAnswer with params: ${params} && payload:${body}`);
	try {
		body.modifiedOn = Date.now();
		const answerResponse = await Answer.updateOne({
			_id: params.answerId,
		}, {
			$set: body,
		}).exec();
		console.log(`update answer response :${answerResponse}`);
		if (answerResponse) {
			return {
				data: {
					msg: 'Answer updated Successfully',
				},
			};
		}
		return {
			error: {
				msg: 'Some error occured while updating answer',
			},
		};
	} catch (e) {
		console.error('Exception occurred while updating answer', e);
		return {
			error: {
				msg: e.message,
			},
		};
	}
};

const bestAnswer = async ({
	params,
	body,
}) => {
	let { answerId, questionId, createdBy } = body
	console.log(`Entering answerService.bestAnswer with params: ${params} && payload:${body}`);
	try {
		const bestAnswerObj = await Answer.findOne({
			questionId: questionId,
			isBestAnswer: true,
		}).exec();
		if (!bestAnswerObj) {
			const answerResponse = await Answer.updateOne({
				_id: answerId,
			}, {
				$set: {
					isBestAnswer: true,
				},
			}, {
				$inc: {
					score: bestAnswerScore,
				},
			}).exec();
			console.log(`best answer response :${answerResponse}`);
			const userResponse = await User.updateOne({
				_id: createdBy,
			}, {
				$inc: {
					reputation: bestAnswerScore,
				},
			});
			if (answerResponse) {
				return {
					data: {
						msg: 'Best Answer marked Successfully',
					},
				};
			}
		} else {
			const answerResponse = await Answer.updateOne({
				_id: bestAnswerObj._id,
			}, {
				$set: {
					isBestAnswer: false,
				},
			}, {
				$inc: {
					score: bestAnswerScore * -1,
				},
			}).exec();
			console.log(`removed best answer response :${answerResponse}`);
			const oldUserResponse = await User.updateOne({
				_id: bestAnswerObj.createdBy,
			}, {
				$inc: {
					reputation: bestAnswerScore * -1,
				},
			});
			const markBestAnswerResponse = await Answer.updateOne({
				_id: answerId,
			}, {
				$set: {
					isBestAnswer: true,
				},
			}, {
				$inc: {
					score: bestAnswerScore,
				},
			}).exec();
			console.log(`marked best answer response :${markBestAnswerResponse}`);
			const userResponse = await User.updateOne({
				_id: createdBy,
			}, {
				$inc: {
					reputation: bestAnswerScore,
				},
			});
			if (answerResponse && markBestAnswerResponse) {
				return {
					data: {
						msg: 'Updated new Best Answer Successfully',
					},
				};
			}
			return {
				error: {
					msg: 'Some error occured while marking best answer',
				},
			};
		}
		return {
			error: {
				msg: 'Some error occured while marking best answer',
			},
		};
	} catch (e) {
		console.error('Exception occurred while marking best answer', e);
		return {
			error: {
				msg: e.message,
			},
		};
	}
};
module.exports = { postQuestion, getQuestion, getAllQuestions, getAnswersByQuestionId, addAnswer }