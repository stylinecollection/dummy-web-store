const express = require('express');
const controller = require('./cart.controller');

const router = express.Router();


router
  .route('/')
  .get(controller.cart);

module.exports = router;

