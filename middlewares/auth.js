const cache = require('lib/cache');
const Moltin = require('lib/moltin');


const getMoltinUser = async (req, res, next) => {
  try {
    const customer_id = req.cookies.customer_id;
    console.log('GET USER');
    if (customer_id) {
      const userFromCache = await cache.get(customer_id);
      if (userFromCache) {
        console.log('from cache');
        req.user = userFromCache.data;
      } else {
        const user = await Moltin.Customers.Get(customer_id);
        await cache.set(customer_id, user);
        req.user = user.data;
      }
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = getMoltinUser;
