const Moltin = require('lib/moltin');


const addProductToCart = async (customer_id, productId) => {
  try {
    const referenceId = 'cart' + customer_id;
    const quantity = 1;

    await Moltin.Cart(referenceId)
      .AddProduct(productId, quantity);
  } catch (error) {
    console.log(error);
    throw Error('Failed to add product');
  }
};

const removeProductFromCart = async (customer_id, productId) => {
  try {
    const referenceId = 'cart' + customer_id;
    const quantity = 1;

    await Moltin.Cart(referenceId)
      .RemoveItem(productId, quantity);
  } catch (error) {
    console.log(error);
    throw Error('Failed to add product');
  }
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
};
