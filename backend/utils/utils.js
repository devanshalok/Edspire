var jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader; //&& authHeader.split(' ')[1]

    if (token == null) return res.json({ 'statusCode': 401, "error": { "msg": "Token not provided in the header" } })

    jwt.verify(token, "280-token", (err, user) => {
        console.log(err)

        if (err) return res.json({ 'statusCode': 403, "error": { "msg": "Invalid Token" } })
        console.log('user is', user);
        req.user = user.data

        next()
    })
}

function authenticateAdminToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader; //&& authHeader.split(' ')[1]

    if (token == null) return res.json({ 'statusCode': 401, "error": { "msg": "Token not provided in the header" } })

    jwt.verify(token, "280-token", (err, user) => {
        console.log(err)

        if (err) return res.json({ 'statusCode': 403, "error": { "msg": "Invalid Token" } })
        console.log('user is', user);
        if (!user.data.isAdmin) return res.json({ 'statusCode': 401, "error": { "msg": "Is not an admin" } })

        req.user = user.data

        next()
    })
}
module.exports = { authenticateToken, authenticateAdminToken }