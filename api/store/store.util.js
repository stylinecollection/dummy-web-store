const cache = require('lib/cache');

const CATEGORY_KEY = 'categories';
const PAGE_SIZE = 10;

const makeKey = (offset, sort, category, stock) => {
  const offsetPlusOne = (offset / PAGE_SIZE) + 1;
  return `${offsetPlusOne}${sort}${category}${stock}`;
};

const oneProduct = (response) => {
  console.log(response.data[0]);
  console.log(response.meta);
  console.log(response.links);
};

const getCategories = async (Moltin) => {
  try {
    const categoriesFromCache = await cache.get(CATEGORY_KEY);
    if (categoriesFromCache) {
      console.log('CATEGORIES FROM CACHE');
      return categoriesFromCache.data.slice(0, 5);
    }

    const categories = await Moltin.Categories
      // .Filter({
      //   eq: {
      //     status: 'live',
      //   },
      // })
      .All();

    await cache.set(CATEGORY_KEY, categories, 0);
    return categories.data.slice(0, 5);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getProducts = async (Moltin, offset, sort, category, stock) => {
  const cacheKey = makeKey(offset, sort, category, stock);
  console.log(`CACHE KEY: ${cacheKey}`);

  try {
    const productsFromCache = await cache.get(cacheKey);
    // const response = await req.Moltin.Products.All();
    if (productsFromCache) {
      console.log('PRODUCTS FROM CACHE');
      oneProduct(productsFromCache);

      return productsFromCache;
    }
    const response = await Moltin.Products
      .With(['main_image', 'category'])
      .Offset(offset)
      .Sort(sort)
      .Limit(PAGE_SIZE)
      // .Filter({ limit: 10 })

      .All();

    await cache.set(cacheKey, response);

    oneProduct(response);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};


module.exports = {
  PAGE_SIZE,
  getCategories,
  getProducts,
};
