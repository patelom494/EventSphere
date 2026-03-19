const Task = require('../models/Task');
const asyncHandler = require('express-async-handler');

// @desc    Create a new task (Admin only)
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = asyncHandler(async (req, res) => {
    const { title, description, assignedTo, dueDate } = req.body;

    if (!title || !assignedTo) {
        res.status(400);
        throw new Error('Please provide title and assignedTo');
    }

    const task = new Task({
        title,
        description,
        assignedTo,
        dueDate,
        createdBy: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
});

// @desc    Get all tasks (Admin only)
// @route   GET /api/tasks
// @access  Private/Admin
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({}).populate('assignedTo', 'name email').sort({ createdAt: -1 });
    res.json(tasks);
});

// @desc    Get tasks assigned to logged-in employee
// @route   GET /api/tasks/my-tasks
// @access  Private/Employee
const getMyTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ assignedTo: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
});

// @desc    Update task status (Employee or Admin)
// @route   PUT /api/tasks/:id
// @access  Private
const updateTaskStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    
    if (!status) {
        res.status(400);
        throw new Error('Please provide status');
    }

    const task = await Task.findById(req.params.id);

    if (task) {
        // Ensure only assigned employee or admin can update status
        if (task.assignedTo.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to update this task status');
        }

        task.status = status;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

module.exports = { createTask, getTasks, getMyTasks, updateTaskStatus };
