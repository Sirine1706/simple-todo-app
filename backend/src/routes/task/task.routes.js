const express = require('express');
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require('../../controllers/task.controllers');
const {
  checkTaskTitle,
  isUserTask,
} = require('../../middlewares/taskMiddleware');
const validator = require('../../middlewares/validator');
const { protect } = require('../../middlewares/userMiddleware');
const { CreateTaskSchema, updateTaskSchema } = require('./taskSchema');

const router = express.Router();

router.post(
  '/',
  protect,
  validator(CreateTaskSchema),
  checkTaskTitle,
  createTask
);
router.get('/', protect, getTasks);
router.get('/:id', protect, isUserTask, getTask);
router.delete('/:id', protect, isUserTask, deleteTask);
router.put(
  '/:id',
  protect,
  isUserTask,
  validator(updateTaskSchema),
  checkTaskTitle,
  updateTask
);

module.exports = router;
