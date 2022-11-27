const express = require('express');

const router = express.Router();
const signUpService = require('../services/signupService');
const loginService = require('../services/loginService');
const userService = require('../services/userServiceNew');
const {authenticateToken} = require('../utils/utils');

router.post('/signup', async (req, res, next) => {
    const response = await signUpService.signUp(req.body);
    res.json(response);
});

router.post('/login', async (req, res, next) => {
    const response = await loginService.login(req.body);
    res.json(response);
});


router.get('/profile', authenticateToken, async (req, res, next) => {
    const response = await userService.getUserProfile(req.user._id);
    res.json(response)
;});

router.post('/profile',authenticateToken, async (req, res, next) => {
    const response = await userService.updateUserProfile({...req.body,userId:req.user._id});
    res.json(response)
;});

router.post('/follow-space',authenticateToken, async (req, res, next) => {
    const response = await userService.followSpace({...req.body},req.user._id);
    res.json(response)
;});
//get all question, get all answers, update profile, get tags used
module.exports = router;