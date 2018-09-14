const express = require('express');
const authenticateMoltin = require('middlewares/moltin');
const getMoltinUser = require('middlewares/auth');

const controller = require('./store.controller');

const router = express.Router();


router
  .route('/')
  .get(authenticateMoltin, getMoltinUser, controller.listPage);

module.exports = router;

