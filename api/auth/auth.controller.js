const {
  loginUser,
  registerUser,
  afterLogin,
} = require('./auth.util');
/**
 * Login page
 * @public
 */

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login', user: req.user });
};


/**
 * Signup page
 * @public
 */

exports.signupForm = (req, res) => {
  res.render('signup', { title: 'Sign Up', user: req.user });
};


/**
 * Logout
 * @public
 */
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('customer_id');
  res.redirect('/');
};


/**
 * Login form submit
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const customer = {
      email: req.body.email,
      password: req.body.password,
      // type: 'custoawait mer',
    };
    const tokenData = await loginUser(customer);

    console.log(tokenData);

    afterLogin(res, tokenData);
  } catch (error) {
    console.log(error);
    next();
  }
};


/**
 * Signup form submit
 * @public
 */
exports.signup = async (req, res, next) => {
  try {
    const customer = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      type: 'customer',
    };

    const tokenData = await registerUser(customer);
    afterLogin(res, tokenData);
  } catch (error) {
    console.log(error);
    next();
  }
};

