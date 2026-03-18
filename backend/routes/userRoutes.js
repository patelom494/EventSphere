const express = require('express');
const router = express.Router();
const { authUser, registerUser, getEmployees } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/employees', protect, admin, getEmployees);

module.exports = router;
