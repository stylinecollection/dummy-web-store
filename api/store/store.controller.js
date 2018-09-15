const {
  PAGE_SIZE,
  getCategories,
  getProducts,
} = require('./store.util');


/**
 * Get list
 * @public
 */
exports.listPage = async (req, res) => {
  try {
    const page = req.query.page || 1; // pagination
    const sort = req.query.sort || ''; // sort by price
    const category = req.query.category || ''; // filter by category
    const stock = req.query.stock || ''; // filter by stock


    const offset = (page - 1) * PAGE_SIZE;
    const categories = await getCategories();
    const products = await getProducts(offset, sort, category, stock);

    const {
      current,
      total,
    } = products.meta.page;

    const nextPageNumber = parseInt(page, 10) + 1;
    const previousPageNumber = parseInt(page, 10) - 1;
    const pagination = {
      page,
      previous: (page > 1 ? `/?page=${previousPageNumber}` : false),
      next: ((current < total && nextPageNumber > 1) ? `/?page=${nextPageNumber}` : false),
      sort,
      category,
      stock,
    };

    console.log(req.cart);

    res.render('index', {
      title: 'Products',
      products: products.data,
      categories,
      category,
      pagination,
      user: req.user,
      cart: req.cart,
    });
  } catch (error) {
    console.log(error);
    res.render('index', {
      title: 'No products found',
      user: req.user,
    });
  }
};
