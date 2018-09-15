const express = require('express');
// const authenticateMoltin = require('middlewares/moltin');
const controller = require('./auth.controller');

const router = express.Router();


router
  .route('/login')
  .get(controller.loginForm)
  .post(controller.login);

router
  .route('/logout')
  .get(controller.logout);

router
  .route('/signup')
  .get(controller.signupForm)
  .post(controller.signup);

module.exports = router;

