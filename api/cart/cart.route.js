const express = require('express');
const getMoltinUser = require('middlewares/auth');
const getMoltinCart = require('middlewares/cart');
const controller = require('./cart.controller');

const router = express.Router();


router
  .route('/')
  .get(getMoltinUser, getMoltinCart, controller.cart);

router
  .route('/add')
  .get(getMoltinUser, controller.addToCart);

router
  .route('/remove')
  .get(getMoltinUser, controller.removeFromCart);

module.exports = router;

