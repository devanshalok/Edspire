const _ = require('lodash');
const mongoose = require('mongoose');
// const Tag = require('../models/Tag');
// const Question = require('../models/Question');
// const Answer = require('../models/Answer');
const User = require('../models/User');
// const Event = require('../models/Event');
// const utils = require('../utils');
const Space = require('../models/Space');
const University = require('../models/University');
const Branch = require('../models/Branch');

const updateUserProfile = async (body) => {
    try {
        const userDetails = await User.updateOne({
            "_id": body.userId
        }, {
            $set: {
                greScore: body.greScore,
                ieltsScore: body.ieltsScore,
                underGradPercent: body.underGradPercent,
                location: body.location,
                university: body.university,
                backlogs: body.backlogs,
                branch: body.branch
            },
        });
        console.log('userdetails', userDetails.matchedCount, userDetails.modifiedCount);
        if (userDetails) {
            return {
                statusCode: 200,
                data: {
                    msg: 'UserProfile updated Successfully',
                },
            };
        }
        return {
            statusCode: 400,
            error: {
                msg: 'Some error occured while updating User Profile',
            },
        };
    } catch (e) {
        console.error('Error while fetching getUserPosts', e);
        return {
            statusCode: 400,
            error: {
                msg: e.message,
            },
        };
    }
};

const getUserProfile = async (userId) => {
    // console.log("######## IN getUserProfile #######")
    try {
        const userDetails = await User.findOne({
            _id: userId,
        }, { password: 0, __v: 0 }).lean();
        // const questionsAsked = await Question.count({
        //     'createdBy._id': userId,
        // }).lean();
        // let topUserQuestions = await Question.find({
        //     'createdBy._id': userId,
        // }).sort({
        //     votes: -1,
        // }).limit(10).lean();
        // topUserQuestions = await utils.resolveTags(topUserQuestions);
        // const questionsUserAnswered = await utils.getQuestionsUserAnswered(userId);
        // const questionsAnswered = await Answer.count({
        //     'createdBy._id': userId,
        // }).lean();
        // const tagsUsed = await tagsUsedByUser(userId);
        // userDetails.tagsUsed = _.cloneDeep(tagsUsed) || [];
        return { statusCode: 200, data: { userDetails } };
    } catch (e) {
        console.error('Error while fetching getUserProfile', e);
        return {
            error: {
                msg: e.message,
            },
        };
    }
};

async function followSpace(body, _id) {
    const space = await Space.updateOne({ _id: body.space }, {
        $inc: {
            followersCount: 1
        },
        $push: {
            followers: _id
        }
    });
    const user = await User.updateOne({ _id: _id }, {
        $push: {
            followedSpaces: body.space
        }
    })
    return { statusCode: 200, data: { msg: "Space followed successfully" } };
}

const getUniversities = async () => {
    // console.log("######## IN getUserProfile #######")
    try {
        const universities = await University.find().lean();
        return { statusCode: 200, data: { universities } };
    } catch (e) {
        console.error('Error while fetching getUserProfile', e);
        return {
            error: {
                msg: e.message,
            },
        };
    }
};

const getBranches = async () => {
    // console.log("######## IN getUserProfile #######")
    try {
        const branches = await Branch.find().lean();
        return { statusCode: 200, data: { branches } };
    } catch (e) {
        console.error('Error while fetching getUserProfile', e);
        return {
            error: {
                msg: e.message,
            },
        };
    }
};

const findColleges = async (userId) => {
    // console.log("######## IN getUserProfile #######")
    try {
        const userDetails = await User.findOne({
            _id: userId,
        }, { password: 0, __v: 0 }).lean();
        const colleges = await University.find({
            $and: [{
                minGre: {
                    $lte: userDetails.greScore.overall
                }
            },
            {
                maxGre: {
                    $gte: userDetails.greScore.overall
                }
            },
            {
                minIelts: {
                    $lte: userDetails.ieltsScore.overall
                }
            },
            {
                maxIelts: {
                    $gte: userDetails.ieltsScore.overall
                }
            },
            {
                minPercent: {
                    $lte: userDetails.underGradPercent
                }
            },
            {
                maxPercent: {
                    $gte: userDetails.underGradPercent
                }
            },
            {
                workExperienceYears: {
                    $lte: userDetails.workExperienceYears
                }
            },
            {
                backlogs: {
                    $gte: userDetails.backlogs
                }
            }
            ]
        });
        console.log('colleges are', colleges);
        console.log('userdetails are', userDetails);
        // const branches = await Branch.find().lean();
        return { statusCode: 200, data: { colleges } };
    } catch (e) {
        console.error('Error while fetching getUserProfile', e);
        return {
            error: {
                message: e.message,
            },
        };
    }
};
module.exports = {
    updateUserProfile, getUserProfile, followSpace, getUniversities, getBranches, findColleges
};