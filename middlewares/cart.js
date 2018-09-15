const cache = require('lib/cache');
const Moltin = require('lib/moltin');


const getMoltinCart = async (req, res, next) => {
  try {
    const customer_id = req.cookies.customer_id;
    console.log('GET CART');
    if (customer_id) {
      const cacheKey = 'cart' + customer_id;
      // const cartFromCache = await cache.get(cacheKey);
      // if (cartFromCache) {
      //   console.log('from cache');
      //   req.cart = cartFromCache.data;
      // } else {
        const cart = await Moltin.Cart(cacheKey).Items();
        await cache.set(cacheKey, cart);
        // console.log(cart);
        req.cart = cart.data;
      // }
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = getMoltinCart;

