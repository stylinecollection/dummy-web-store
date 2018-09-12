const moltin = require('@moltin/sdk');

const Moltin = moltin.gateway({
  client_id: process.env.MOLTIN_CLIENT_ID,
  client_secret: process.env.MOLTIN_CLIENT_SECRET,
});



module.exports = Moltin;

