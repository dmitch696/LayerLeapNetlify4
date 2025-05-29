# Stripe Checkout Backend for Netlify

## Setup Instructions

1. Set your Stripe secret key as an environment variable on Netlify:

```
STRIPE_SECRET_KEY=sk_test_xxx_your_secret_key_here
```

2. Deploy this repository to Netlify.

3. Your checkout session function endpoint will be available at:

```
https://<your-netlify-site>.netlify.app/.netlify/functions/create-checkout-session
```

4. To create a checkout session, make a POST request to the endpoint with query parameter `plan=monthly` or `plan=yearly`:

Example:

```bash
curl -X POST "https://<your-netlify-site>.netlify.app/.netlify/functions/create-checkout-session?plan=monthly"
```

or

```bash
curl -X POST "https://<your-netlify-site>.netlify.app/.netlify/functions/create-checkout-session?plan=yearly"
```

5. Use the returned `id` to redirect users with Stripe.js on your frontend.

---

## Notes

- The subscription has a 14-day free trial configured via the backend.
- Replace the success and cancel URLs in `create-checkout-session.js` if needed.
