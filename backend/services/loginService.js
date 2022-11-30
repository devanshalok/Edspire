/* eslint-disable eqeqeq */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TagsModel = require('../models/Tag');
const UserModel = require('../models/User');
const AnswerModel = require('../models/Answer');
const QuestionsModel = require('../models/Question');

async function login(body) {
	const emailId = body.email;
	const {
		password,
	} = body;
	let response;
	let
		statusCode;
	try {
		const user = await UserModel.findOne({
			emailId,
		});//.populate('bookmarks');
		console.log('#### users :', user, emailId);
		if (user) {
			const userObj = user;
			console.log('userobj is',userObj)
			const isValidPassword = bcrypt.compareSync(password, userObj.password); // true
			if (isValidPassword == false) {
				error = {
					msg: 'Login failed',
				};
				statusCode = 401;
				return {
					error,
					statusCode,
				};
			}
			delete userObj.password;
			userObj.userId = user._id;
			const token = jwt.sign({
				data: userObj,
			}, '280-token', {
				expiresIn: '24h',
			});
			userObj.token = token;
			msg = {
				token,
				msg: 'LoggedIn successfully',
				userDetails: userObj,
			};
			statusCode = 200;
			return {
				data: msg,
				statusCode,
			};
		}
		error = {
			msg: 'Invalid user name or password',
		};
		statusCode = 400;
		return {
			error,
			statusCode,
		};
	} catch (err) {
		console.log('@@@@ err', err);
		response = {
			msg: 'Failed to login',
		};
		statusCode = 400;
		return {
			error: response,
			statusCode,
		};
	}
}

module.exports = {
	login,
};