const {
  addProductToCart,
  removeProductFromCart,
} = require('./cart.util');

/**
 * Cart page
 * @private
 */

exports.cart = (req, res) => {
  res.render('cart', {
    title: 'Cart',
    user: req.user,
    cart: req.cart,
  });
};


/**
 * Add to Cart
 * @private
 */
exports.addToCart = async (req, res, next) => {
  try {
    console.log(req.query);
    await addProductToCart(req.cookies.customer_id, req.query.product);
    res.redirect('/' + req.query.from);
  } catch (error) {
    console.log(error);
    throw Error('Failed to add product');
  }
};


/**
 * Remove from Cart
 * @private
 */
exports.removeFromCart = async (req, res, next) => {
  try {
    await removeProductFromCart(req.cookies.customer_id, req.query.product);
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
    throw Error('Failed to add product');
  }
};
