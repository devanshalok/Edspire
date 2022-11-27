const space = require('../models/Space');

async function createSpace(body) {
    const spaceResp = await space.create(body);
    return {statusCode:200,data:{msg:'Space created successfully'}}
}

module.exports = {createSpace}