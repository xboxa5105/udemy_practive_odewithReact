/* eslint-disable import/order */
import keys from '../config/keys';

const stripe = require('stripe')(keys.stripeSerectKey);

export default function billingRoutes(app) {
  app.post('/api/stripe', async (req, res) => {
    const { id } = req.body;
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: id,
      description: 'Add 5 dollors credit',
    });

    req.user.credit += 5;
    const user = await req.user.save();
    console.log(user);
  });
}
