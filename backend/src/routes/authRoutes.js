const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const { validate } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.get('/me', authenticate, me);

module.exports = router;
