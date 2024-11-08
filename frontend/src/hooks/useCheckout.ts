import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { ProductEntity } from '../gql/graphql';
import { useState } from 'react';
import { useCartInfo } from './useCartInfo';
import useAuth from './useAuth';
import { useSessionStorage } from './useSessionStorage';

type dataType = {
  products: { data: ProductEntity[] };
};

export const useCheckout = (data: dataType) => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const { total } = useCartInfo(data, 'cart');
  const { activeUser } = useAuth();
  const { getLatestStoredValue } = useSessionStorage('cartProducts');

  const handleCheckout = async () => {
    setLoadingPayment(true);

    let products;
    if (activeUser) products = data;
    if (!activeUser) products = getLatestStoredValue('cartProducts').data;

    const lineItems = products.map((item: ProductEntity) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.attributes?.name,
            images: [item.attributes?.img],
          },
          unit_amount: Math.round(item.attributes!.price) * 100,
        },
        quantity: item.attributes?.cartCounter,
      };
    });

    const session = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/orders`, {
      total: +total.toFixed(2) + 10,
      lineItems,
      userId: activeUser?.user?.id,
      customOrderId: (Math.floor(Math.random() * (1000 - 1 + 1)) + 1).toString(),
    });

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: session.data.id });
    setLoadingPayment(false);
  };
  return { handleCheckout, loadingPayment };
};
