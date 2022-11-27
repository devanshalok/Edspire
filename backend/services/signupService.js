const TagsModel = require('../models/Tag');
const UserModel = require('../models/User');
const AnswerModel = require('../models/Answer');
const QuestionsModel = require('../models/Question');
var _ = require('lodash')
var uuid = require('uuidv4');
var bcrypt = require('bcryptjs');
var saltRounds = 10;
const jwt = require('jsonwebtoken');

async function signUp(body) {
    try {
        // let {body, params, query} = data
        const name = body.name;
        const password = body.password;
        const email = body.email;
        // var userInstance = ModelFactory.getUserInstance();
        console.log("### signUp", body)
        var user = await UserModel.findOne({ emailId: email })
        console.log("### signUp user : ", user)
        if(user) {
            return {error: { msg: 'Email already exists' }, statusCode: 401};
        } else {
            const encryptedPassword = bcrypt.hashSync(password, saltRounds);
            let newUserObj = {
                name: name,
                emailId: email,
                password: encryptedPassword
    
            }
            var newUserCreatedRes = await UserModel.create(newUserObj);
            console.log("### newUserCreatedRes :", newUserCreatedRes);
            const token = jwt.sign({
				data: user,
			}, '230-token', {
				expiresIn: '24h',
			});
            return {data: { username,token, email, msg: 'User Created Successfully' }, statusCode: 200};
        }
    } catch(err) {
        console.log("##### err : ", err)
        return {error: err, statusCode: 400};
    }

}

module.exports = {
    signUp
}