// GET SPACES, ADD SPACES, GET PENDING QUESTIONS, UPDATE QUESTION REVIEW STATUS
const express = require('express');
const router = express.Router();
const adminService = require('../services/adminServiceNew');
const {authenticateAdminToken} = require('../utils/utils');

router.post('/create-space', authenticateAdminToken,async (req, res, next) => {
    const response = await adminService.createSpace(req.body);
    res.json(response);
});

module.exports = router;