const cache = require('lib/cache');
const Moltin = require('lib/moltin');

const CATEGORY_KEY = 'categories';
const PAGE_SIZE = 10;

const makeKey = (offset, sort, category, stock) => {
  const offsetPlusOne = (offset / PAGE_SIZE) + 1;
  return `${offsetPlusOne}${sort}${category}${stock}`;
};

const oneProduct = (response) => {
  if (response.data.length > 0) {
    response.data.forEach((product) => {
      console.log(product.meta.stock);
    });
    // console.log(response.meta);
    // console.log(response.links);
  } else {
    console.log('NO PRODUCT FOUND');
    console.log(response);
  }
};

const getCategories = async () => {
  try {
    const categoriesFromCache = await cache.get(CATEGORY_KEY);
    if (categoriesFromCache) {
      console.log('CATEGORIES FROM CACHE');
      return categoriesFromCache.data;
    }

    const categories = await Moltin.Categories
      // .Filter({
      //   eq: {
      //     status: 'live',
      //   },
      // })
      .All();

    await cache.set(CATEGORY_KEY, categories, 0);
    return categories.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getProducts = async (offset, sort, category, stock) => {
  const cacheKey = makeKey(offset, sort, category, stock);
  console.log(`CACHE KEY: ${cacheKey}`);

  try {
    const productsFromCache = await cache.get(cacheKey);
    // const response = await req.Moltin.Products.All();
    if (productsFromCache) {
      console.log('PRODUCTS FROM CACHE');
      // oneProduct(productsFromCache);

      return productsFromCache;
    }

    const filterObj = { eq: {} };

    if (category !== '') {
      console.log('FILTER WITH CATEGORY');
      filterObj.eq.category = category;
    }

    if (stock !== '') {
      console.log('FILTER BY STOCK');
      filterObj.eq.meta = {
        stock: {
          availability: stock,
        },
      };
    }

    const response = await Moltin.Products
      .With('category')
      .Offset(offset)
      .Sort(sort)
      .Limit(PAGE_SIZE)
      .Filter(filterObj)
      .All();

    await cache.set(cacheKey, response);

    // oneProduct(response);
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
