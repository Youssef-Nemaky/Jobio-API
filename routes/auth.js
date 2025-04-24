const express = require('express');
const { register } = require('../controllers/auth');

const authRouter = express.Router();

authRouter.route('/register').post(register);
// authRouter.route('/login', login);

module.exports = authRouter;
