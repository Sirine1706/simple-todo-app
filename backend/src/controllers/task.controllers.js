const slug = require('slug');
const { Schema } = require('../models/task.model');
const Task = require('../models/task.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterBody');

exports.createTask = catchAsync(async (req, res, next) => {
  req.body.author = req.user.id;
  const task = await Task.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      task,
    },
  });
});

exports.getTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ author: req.user.id });
  res.status(200).json({
    status: 'success',
    data: {
      tasks,
    },
  });
});
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});
exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});
exports.updateTask = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'description', 'title');
  const task = await Task.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});
