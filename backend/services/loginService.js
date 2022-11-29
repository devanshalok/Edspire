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
			delete user.password;
			const userObj = user;
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
			user.userId = user._id;
			const token = jwt.sign({
				data: user,
			}, '280-token', {
				expiresIn: '24h',
			});
			msg = {
				token,
				msg: 'LoggedIn successfully',
				userDetails: user,
			};
			statusCode = 200;
			return {
				data:msg,
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
			error:response,
			statusCode,
		};
	}
}

module.exports = {
	login,
};