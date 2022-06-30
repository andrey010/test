const express = require('express');
const { isAuth } = require('../../helpers/functions.js');
const auth = require('../controllers/auth.js');
const authValidator = require('../controllers/auth.validator.js');
const router = express.Router();

router.post('/login', authValidator.onLogin, auth.login); 
router.post('/logout', isAuth, auth.logout);
router.get('/isLogin', auth.isLogin);

module.exports = router;