/* eslint-disable import/order */
import keys from '../config/keys';
import requireLogin from '../middlewares/requireLogin';

const stripe = require('stripe')(keys.stripeSerectKey);

export default function billingRoutes(app) {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const { id } = req.body;
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: id,
      description: 'Add 5 dollors credit',
    });

    req.user.credits += 5;
    const user = await req.user.save();
    console.log(user);
    res.send(user);
  });
}
