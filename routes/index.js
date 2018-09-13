const express = require('express');

const controller = require('api/store/store.controller');

const router = express.Router();

/* Render Home page with Product listing */
router
  .get('/', controller.getList);

module.exports = router;
