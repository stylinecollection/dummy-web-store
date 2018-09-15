const express = require('express');


const router = express.Router();

/* Signup page. */
router.get('/', (req, res) => {
  res.render('signup', { title: 'Sign Up' });
});

module.exports = router;
