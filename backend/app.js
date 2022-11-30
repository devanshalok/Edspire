const express = require('express');
const logger = require('morgan');
const redis = require('redis')
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./rest/userRouter');
const questionAnswerRouter = require('./rest/questionAnswerRouter');
const adminRouter = require("./rest/adminRouter");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cors());
app.use('/',userRouter);
app.use('/qa',questionAnswerRouter);
app.use('/admin',adminRouter);
app.use((err, req, res, next) => {
  console.error('in error handler');
  // set locals, only providing error in development

  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 400).json({
    error: {
      message: err.message,
    },
  });
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, "280-token", (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}
module.exports = app;
