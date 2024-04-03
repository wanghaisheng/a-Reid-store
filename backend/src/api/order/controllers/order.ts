const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const { lineItems } = ctx.request.body as any;
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 10 * 100, // shipping cost in cents
                currency: "usd",
              },
              display_name: "Standard shipping",
            },
          },
        ],
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${process.env.CLIENT_URL}/shopping-cart?success=true`,
        cancel_url: `${process.env.CLIENT_URL}/shopping-cart?cancel=true`,
      });

      await strapi.service("api::order.order").create({
        data: { items: lineItems, stripeId: session.id },
      });

      return session;
    },
  })
);
