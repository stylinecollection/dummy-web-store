const express = require('express');
const getMoltinUser = require('middlewares/auth');
const getMoltinCart = require('middlewares/cart');

const controller = require('./store.controller');

const router = express.Router();


router
  .route('/')
  .get(getMoltinUser, getMoltinCart, controller.listPage);

module.exports = router;

