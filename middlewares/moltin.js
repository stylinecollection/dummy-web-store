const moltin = require('@moltin/sdk');

const authenticateMoltin = (req, res, next) => {
  const Moltin = moltin.gateway({
    client_id: process.env.MOLTIN_CLIENT_ID,
    client_secret: process.env.MOLTIN_CLIENT_SECRET,
  });

  Moltin.Authenticate()
    .then(() => {
      req.Moltin = Moltin;
      next();
    });
};

module.exports = authenticateMoltin;
