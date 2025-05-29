const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const params = event.queryStringParameters || {};
  const plan = params.plan || 'monthly';

  const priceIds = {
    monthly: 'price_1RTiDJRogmxXNhRkG1MFGZiC',
    yearly: 'price_1RTiEgRogmxXNhRk6BaLapxm',
  };

  const priceId = priceIds[plan];

  if (!priceId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid plan specified' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 14,
      },
      success_url: 'https://layerleap.io/success',
      cancel_url: 'https://layerleap.io/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
