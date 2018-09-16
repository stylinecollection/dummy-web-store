import { gateway as MoltinGateway } from '@moltin/sdk'

const Moltin = MoltinGateway({
  client_id: 'OU4YzqRrGL0nQU24jnCMswdXSLQH2wsR2qrFjquZYB',
});

export default {

  getHomepageProducts (limit=10, offset=0, category=null, availability=null) {
    let filter = {};

    if(category != null) {
      filter = {eq: {category: {id: category}}};
    }
    if(availability != null){
      if(availability == 0){
        if(!filter.hasOwnProperty('eq')){
          filter.eq = {};
        }
        filter.eq.stock = 0;
      }
      else{
        if(!filter.hasOwnProperty('gt')){
          filter.gt = {};
        }
        filter.gt.stock = 0;
      }
    }
    return Moltin.Products.Filter(filter).With('categories').Limit(limit).Offset(offset).All();

  },

  getSortedProducts (limit=10, offset=0, sort='-price') {
    const Moltin = MoltinGateway({
      client_id: 'OU4YzqRrGL0nQU24jnCMswdXSLQH2wsR2qrFjquZYB'
    });

    return Moltin.Products.Sort(sort).With('categories').Limit(limit).Offset(offset).All();
  },

  createCustomer (customerDetails) {
    const customer = {
      name: customerDetails.name,
      email: customerDetails.email,
      password: customerDetails.password
    }
    return Moltin.Customers.Create(customer);
  },

  loginCustomer (customerDetails) {
    const customer = {
      email: customerDetails.email,
      password: customerDetails.password
    }
    return Moltin.Customers.Token(customer.email, customer.password);
  },

  getCustomerName (id, token) {
    return Moltin.Customers.Get(id,token)
  },

  getCategories () {
    return Moltin.Categories.All();
  },

  findBySlug (slug) {
    return Moltin.Products.Filter({
      eq: {
        slug: slug
      }
    }).With(['main_image', 'brands']).Limit(1).All()
  },

  getCart (ref) {
    return Moltin.Cart(ref).Items();
  },

  addToCart (ref, productId, qty) {
    return Moltin.Cart(ref).AddProduct(productId, qty)
  },

  removeFromCart (ref, itemId) {
    return Moltin.Cart(ref).RemoveItem(itemId)
  }
}
