const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const {
        total,
        lineItems,
        userId,
        stripeId,
        flag,
        id,
        customOrderId,
        paymentIntentId,
      } = ctx.request.body as any;

      if (id && stripeId) {
        if (flag == "get") {
          const paymentIntents = await stripe.paymentIntents.list({
            limit: 100, // Adjust based on how many you want to retrieve
          });
          ctx.send(paymentIntents);
        }
        if (flag == "post") {
          try {
            const refund = await stripe.refunds.create({
              payment_intent: paymentIntentId,
            });
            console.log("Refund successful:", refund);
            await strapi.service("api::order.order").delete(id);
            ctx.send(refund);
          } catch (error) {
            console.error("Refund error:", error);
            throw error;
          }
        }
      } else {
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
          payment_intent_data: {
            metadata: {
              userId,
              customOrderId,
            },
          },
        });

        await strapi.service("api::order.order").create({
          data: {
            amount: total,
            items: lineItems,
            stripeId: session.id,
            userId,
            customOrderId,
          },
        });

        ctx.send(session);
      }
    },
  })
);
