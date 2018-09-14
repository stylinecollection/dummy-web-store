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
    const category = req.query.catetory || ''; // filter by category
    const stock = req.query.stock || ''; // filter by stock


    const offset = (page - 1) * PAGE_SIZE;
    const categories = await getCategories(req.Moltin);
    const products = await getProducts(req.Moltin, offset, sort, category, stock);

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
    };

    console.log(pagination);

    res.render('index', {
      title: 'Products',
      products: products.data,
      categories,
      category,
      pagination,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    res.render('index', {
      title: 'No products found',
      user: req.user,
    });
  }
};
