/* eslint-disable import/order */
const { stripeSerectKey } = require('../config/keys');
const stripe = require('stripe')(stripeSerectKey);

export default function billingRoutes(app) {
  app.post('/api/stripe', (req, res) => {

  });
}
