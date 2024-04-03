import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { ProductEntity } from '../gql/graphql';
import { useState } from 'react';

type dataType = {
  products: { data: ProductEntity[] };
};

export const useCheckout = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const handleCheckout = async (data: dataType) => {
    setLoadingPayment(true);

    const lineItems = data.products.data.map((item: ProductEntity) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.attributes?.name,
          },
          unit_amount: Math.round(item.attributes!.price) * 100,
        },
        quantity: item.attributes?.cartCounter,
      };
    });

    const session = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/orders`, {
      lineItems,
    });

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: session.data.id });
    setLoadingPayment(false);
  };
  return { handleCheckout, loadingPayment };
};
