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
const jwt = require('jsonwebtoken');
const Question = require('../models/Question');

const updateUserProfile = async (body) => {
    console.log('body is ', body)
    try {
        const userDetails = await User.updateOne({
            "_id": body.userId
        }, {
            $set: {
                firstName: body.firstName || undefined,
                lastName: body.lastName || undefined,
                // password:body.password|| undefined,
                street: body.street || undefined,
                city: body.city || undefined,
                state: body.state || undefined,
                country: body.country || undefined,
                greScore: body.greScore || undefined,
                ieltsScore: body.ieltsScore || undefined,
                university: body.university || undefined,
                branch: body.branch || undefined,
                underGradPercent: body.underGradPercent || undefined,
                backlogs: body.backlogs || undefined,
                workExperienceYears: body.workExperienceYears || undefined,
                linkedIn: body.linkedIn || undefined,
                twitter: body.twitter || undefined
            },
        });
        console.log('userdetails', userDetails);
        if (userDetails) {
            let returnDetails = await User.findOne({
                "_id": body.userId
            });
            const token = jwt.sign({
                data: returnDetails,
            }, '280-token', {
                expiresIn: '24h',
            });
            console.log('returnDetails', returnDetails);
            return {
                statusCode: 200,
                data: {
                    msg: 'UserProfile updated Successfully',
                    profile: returnDetails,
                    token: token
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
        }, { password: 0, __v: 0 }).populate('university').lean();
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
    const space = await Space.updateOne({ name: body.space }, {
        $inc: {
            followersCount: 1
        },
        $addToSet: {
            followers: _id
        }
    });
    const user = await User.updateOne({ _id: _id }, {
        $addToSet: {
            followedSpaces: body.space
        }
    })
    return { statusCode: 200, data: { msg: "Space followed successfully" } };
}

async function unfollowSpace(body, _id) {
    const space = await Space.updateOne({ name: body.space }, {
        $inc: {
            followersCount: -1
        },
        $pull: {
            followers: _id
        }
    });
    const user = await User.updateOne({ _id: _id }, {
        $pull: {
            followedSpaces: body.space
        }
    })
    return { statusCode: 200, data: { msg: "Space unfollowed successfully" } };
}

async function followUniversity(body, _id) {
    const user = await User.updateOne({ _id: _id }, {
        $addToSet: {
            followedUniversities: body.university
        }
    })
    return { statusCode: 200, data: { msg: "University followed successfully" } };
}

async function unfollowUniversity(body, _id) {
    const user = await User.updateOne({ _id: _id }, {
        $pull: {
            followedUniversities: body.university
        }
    })
    return { statusCode: 200, data: { msg: "University unfollowed successfully" } };
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


const getSpaces = async () => {
    // console.log("######## IN getUserProfile #######")
    try {
        const spaces = await Space.find().lean();
        return { statusCode: 200, data: { spaces } };
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
                    $lte: userDetails.greScore
                }
            },
            {
                maxGre: {
                    $gte: userDetails.greScore
                }
            },
            {
                minIelts: {
                    $lte: userDetails.ieltsScore
                }
            },
            {
                maxIelts: {
                    $gte: userDetails.ieltsScore
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

const findCollegesWithParams = async (bldy) => {
    // console.log("######## IN getUserProfile #######")
    try {
        // const userDetails = await User.findOne({
        //     _id: userId,
        // }, { password: 0, __v: 0 }).lean();
        console.log('bldy is', bldy);
        const colleges = await University.find({
            $and: [{
                minGre: {
                    $lte: bldy.greScore
                }
            },
            {
                maxGre: {
                    $gte: bldy.greScore
                }
            },
            {
                minIelts: {
                    $lte: bldy.ieltsScore
                }
            },
            {
                maxIelts: {
                    $gte: bldy.ieltsScore
                }
            },
            {
                minPercent: {
                    $lte: bldy.underGradPercent
                }
            },
            {
                maxPercent: {
                    $gte: bldy.underGradPercent
                }
            },
            {
                workExperienceYears: {
                    $lte: bldy.workExperienceYears
                }
            },
            {
                backlogs: {
                    $gte: bldy.backlogs
                }
            },
                // {
                //     graduateCourses:{

                //     }
                // }
            ]
        });
        console.log('colleges are', colleges);
        // console.log('userdetails are', userDetails);
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

async function followQuestion(body, _id) {
    const user = await User.updateOne({ _id: _id }, {
        $addToSet: {
            followedQuestions: body.questionId
        }
    });
    const question = await Question.updateOne({ _id: body.questionId }, {
        $inc: {
            followers: 1
        }
    })
    return { statusCode: 200, data: { msg: "Question followed successfully" } };
}

async function unfollowQuestion(body, _id) {
    const user = await User.updateOne({ _id: _id }, {
        $pull: {
            followedQuestions: body.questionId
        }
    });
    const question = await Question.updateOne({ _id: body.questionId }, {
        $inc: {
            followers: -1
        }
    })
    return { statusCode: 200, data: { msg: "Question unfollowed successfully" } };
}

async function getAllUsers(_id) {
    const users = await User.find({ _id: { $ne: _id } });
    console.log('users', users);
    return { statusCode: 200, data: { users } };
}

async function getUniversity(name) {
    const university = await University.find({ name }).populate(['graduateCourses','undergraduateCourses']);
    console.log('university', university);
    return { statusCode: 200, data: { university } };
}

module.exports = {
    updateUserProfile, getUserProfile, followSpace, getUniversities, getBranches, findColleges, getSpaces, followUniversity,unfollowUniversity,unfollowQuestion,unfollowSpace, findCollegesWithParams, followQuestion, getAllUsers,getUniversity
};