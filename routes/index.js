const express = require('express');

const authRoutes = require('api/auth/auth.route');
const cartRoutes = require('api/cart/cart.route');
const storeRoutes = require('api/store/store.route');

const router = express.Router();

router.use('/', storeRoutes);
router.use('/account', authRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
