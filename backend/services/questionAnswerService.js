const {
	log,
} = require('console');
const _ = require('lodash');
const Question = require('../models/Question');
const User = require('../models/User');
const Answer = require('../models/Answer');
const Space = require('../models/Space');
async function postQuestion(body, _id) {
	//check that space id is passed in.
	const createdBy = {
		_id: _id
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
	console.log('newquestion', newQuestion);
	return { 'statusCode': 200, response: { msg: "Question successfully created" } };
}

async function getQuestion(_id) {
	const question = await Question.findOne({ _id });
	console.log('question', question);
	return { 'statusCode': 200, response: { question } };
}

async function getAllQuestions() {
	const questions = await Question.find();
	console.log('all questions', questions);
	return { 'statusCode': 200, response: { questions } };
}
const getAnswersByQuestionId = async (params) => {
	console.log('Entering answerService.getAnswersByResourceId');
	try {
		let answers = await Answer.find({
			questionId: params.questionId,
		}).lean();
		console.log(`get answer response :${answers}`);
		return { 'statusCode': 200, response: { answers } };
	} catch (e) {
		console.error('Exception occurred while getting answers', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const addAnswer = async (body, _id) => {
	console.log(`Entering answerService.addAnswer,payload is ${body}`);
	try {
		const createdBy = {
			_id: _id
		};
		body.createdBy = createdBy;
		const answerResponse = await Answer.create(body);
		console.log(`add answer response :${answerResponse}`);
		const question = await Question.findById(body.questionId).lean();
		question.answers.push(answerResponse._id);
		const questionResponse = await Question.updateOne({
			_id: body.questionId,
		}, {
			$set: question,
		}).exec();
		if (answerResponse && questionResponse) {
			return answerResponse
		}
		return {
			error: {
				message: 'Some error occured while creating answer',
			},
		};
	} catch (e) {
		console.error('Exception occurred while creating answer', e);
		return {
			error: {
				message: e.message,
			},
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
					message: 'Answer updated Successfully',
				},
			};
		}
		return {
			error: {
				message: 'Some error occured while updating answer',
			},
		};
	} catch (e) {
		console.error('Exception occurred while updating answer', e);
		return {
			error: {
				message: e.message,
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
						message: 'Best Answer marked Successfully',
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
						message: 'Updated new Best Answer Successfully',
					},
				};
			}
			return {
				error: {
					message: 'Some error occured while marking best answer',
				},
			};
		}
		return {
			error: {
				message: 'Some error occured while marking best answer',
			},
		};
	} catch (e) {
		console.error('Exception occurred while marking best answer', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};
module.exports = { postQuestion, getQuestion, getAllQuestions, getAnswersByQuestionId, addAnswer }