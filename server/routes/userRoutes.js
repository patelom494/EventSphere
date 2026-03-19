const express = require('express');
const router = express.Router();
const { authUser, registerUser, getEmployees } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin, runValidation } = require('../validations/authValidator');

router.post('/login', validateLogin, runValidation, authUser);
router.post('/register', validateRegister, runValidation, registerUser);
router.get('/employees', protect, admin, getEmployees);

module.exports = router;
