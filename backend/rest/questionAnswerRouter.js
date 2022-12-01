// post question,update question, get all questions, get question by userId, get spaces,  post answer, mark best answer, update answer, post comments
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../utils/utils');
const questionAnswerService = require('../services/questionAnswerService');

router.post('/question',authenticateToken, async (req, res, next) => {
    const response = await questionAnswerService.postQuestion(req.body,req.user)
    res.json(response);
});

router.get('/question',authenticateToken, async (req, res, next) => {
    const response = await questionAnswerService.getQuestion(req.query.questionId)
    res.json(response);
});

router.get('/questions',authenticateToken, async (req, res, next) => {
    const response = await questionAnswerService.getAllQuestions(null,req.user._id)
    res.json(response);
});

router.get('/questions-for-space',authenticateToken, async (req, res, next) => {
    console.log('space is ',req.query.space);
    const response = await questionAnswerService.getAllQuestions(req.query.space,req.user._id)
    res.json(response);
});

router.post('/answer',authenticateToken, async (req, res, next) => {
    const response = await questionAnswerService.addAnswer(req.body,req.user)
    res.json(response);
});

router.get('/upvote',authenticateToken, async (req, res, next) => {
    const response = await questionAnswerService.upVote(req.query.answerId,req.query.num,req.user._id,req.query.isDownVoted)
    res.json(response);
});

router.get('/downvote',authenticateToken, async (req, res, next) => {
    const response = await questionAnswerService.downVote(req.query.answerId,req.query.num,req.user._id,req.query.isUpVoted)
    res.json(response);
});

module.exports = router;