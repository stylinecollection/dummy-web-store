const express = require('express');


const router = express.Router();

/* cart page. */
router.get('/', (req, res) => {
  res.render('cart', { title: 'Shopping Cart' });
});

module.exports = router;
