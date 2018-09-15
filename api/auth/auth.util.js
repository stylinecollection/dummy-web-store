const Moltin = require('lib/moltin');


const loginUser = async ({ email, password }) => {
  try {
    const token = await Moltin.Customers.Token(email, password);
    console.log(token);
    return {
      customer_id: token.data.customer_id,
      token: token.data.token,
      expires: token.data.expires * 1000, // seconds to milliseconds
      name: token.data.name || 'justname',
    };
  } catch (error) {
    console.log(error);
    throw Error('failed to login');
  }
};

const registerUser = async (customer) => {
  try {
    const user = await Moltin.Customers.Create(customer);
    console.log(user);
    const token = await loginUser(Moltin, customer); // await Motlin.Customers.
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
    throw Error('failed to register');
  }
};

const afterLogin = (res, { token, expires, customer_id, name }) => {
  res.cookie('token', token,
    { expires: new Date(expires), httpOnly: true });
  res.cookie('customer_id', customer_id,
    { expires: new Date(expires), httpOnly: true });

  res.redirect('/');
};


module.exports = {
  loginUser,
  registerUser,
  afterLogin,
};
