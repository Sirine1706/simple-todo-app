const slug = require('slug');
const { Schema } = require('../models/task.model');
const Task = require('../models/task.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.checkTaskTitle = catchAsync(async (req, res, next) => {
  if (await Task.findOne({ title: req.body.title, author: req.user.id })) {
    return next(new AppError('used title !Please choose another title', 400));
  }
  next();
});

exports.validTaskSchema = catchAsync(async (req, res, next) => {
  req.body.author = req.user.id;
  req.body.slug = slug(req.body.title);
  next();
});

exports.isUserTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.author.toString() !== req.user.id) {
    return next(
      new AppError('You are not authorized to perform such an action')
    );
  }
  next();
});
