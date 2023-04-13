/** @format */

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./src/utils/AppError');
const globalErrorHandler = require('./src/controllers/error.controllers');

const app = express();
const taskRouter = require('./src/routes/task/task.routes');
const userRouter = require('./src/routes/user/user.routes');

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
const limiter = rateLimiter({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this API, please try again in an hour!',
});
app.use('/api', limiter);
app.use(mongoSanitize());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
