const { check, validationResult } = require('express-validator');

exports.validateTask = [
    check('title', 'Title is required').not().isEmpty(),
    check('assignedTo', 'AssignedTo is required').not().isEmpty(),
];

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
