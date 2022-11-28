const space = require('../models/Space');
const university = require('../models/University');
const branch = require('../models/Branch');

async function createSpace(body) {
    const spaceResp = await space.create(body);
    return {statusCode:200,data:{msg:'Space created successfully'}}
}

async function createBranch(body) {
    const braResp = await branch.create(body);
    return {statusCode:200,data:{msg:'Branch created successfully'}}
}

async function createUniversity(body) {
    const uniResp = await university.create(body);
    return {statusCode:200,data:{msg:'University created successfully'}}
}
module.exports = {createSpace,createBranch,createUniversity}