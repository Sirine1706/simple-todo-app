const mongoose = require('mongoose');
const slug = require('slug');
const Joi = require('joi');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  slug: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

TaskSchema.pre('save', function () {
  this.slug = slug(this.title);
});
TaskSchema.pre(/update/, function (next) {
  if (this.isModified('title')) this.slug = slug(this.title);
  next();
});

exports.CreateTaskSchema = Joi.object({
  title: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string(),
  slug: Joi.string(),
  author: Joi.string().hex().length(24),
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
