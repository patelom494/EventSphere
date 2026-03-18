const express = require('express');
const router = express.Router();
const { createTask, getTasks, getMyTasks, updateTaskStatus } = require('../controllers/taskController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, admin, createTask);
router.get('/', protect, admin, getTasks);
router.get('/my-tasks', protect, getMyTasks);
router.put('/:id', protect, updateTaskStatus);

module.exports = router;
