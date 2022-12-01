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
        const firstName = body.firstName;
        const lastName = body.lastName;
        const password = body.password;
        const email = body.email;
        var user = await UserModel.findOne({ emailId: email })
        if (user) {
            return { error: { msg: 'Email already exists' }, statusCode: 401 };
        } else {
            const encryptedPassword = bcrypt.hashSync(password, saltRounds);
            let newUserObj = {
                firstName,
                lastName,
                emailId: email,
                password: encryptedPassword

            }
            var newUserCreatedRes = await UserModel.create(newUserObj);
            var user = await UserModel.findOne({ emailId: email })
            console.log("### newUserCreatedRes :", newUserCreatedRes);
            const token = jwt.sign({
                data: user,
            }, '280-token', {
                expiresIn: '24h',
            });
            delete newUserObj.password;
            newUserObj.token = token;
            return { data: { userDetails:user,token:token, msg: 'User Created Successfully' }, statusCode: 200 };
        }
    } catch (err) {
        console.log("##### err : ", err)
        return { error: { msg: err.message }, statusCode: 400 };
    }

}

module.exports = {
    signUp
}