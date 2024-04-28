import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import PageContainer from '../../components/PageContainer';
import { Alert, AlertTitle, Backdrop, styled } from '@mui/material';
import CartTable from './CartTable';
import { useEffect, useState } from 'react';
import CartTotals from './CartTotals';
import Empty from '../../components/AsideDrawer/Empty';
import { useAppSelector } from '../../app/store';
import { useSearchParams } from 'react-router-dom';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { ProductEntity } from '../../gql/graphql';
import Toast from '../../components/Toasts/Toast';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';

export const PageWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridGap: '3rem',

  '& .table': {
    gridColumn: '1/13',
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1/10',
    },
  },

  '& .totals': {
    gridColumn: '1/13',
    [theme.breakpoints.up('lg')]: {
      gridColumn: '10/13',
    },
  },

  '& .emptyCart': {
    gridColumn: '1/13',
    img: { width: '25%' },
  },
}));

const ShoppingCart = () => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { isAddedToCart: true, isLiked: false },
  });
  const { cartCounter } = useAppSelector((store) => store.drawer);
  const [searchParams] = useSearchParams();
  const { handleProduct } = useAsideDrawer();
  const [succeedPayment, setSucceedPayment] = useState(false);
  const [canceledPayment, setCanceledPayment] = useState(false);
  const [open, setOpen] = useState(true);
  const { activeUser } = useAuth();
  const { getLatestStoredValue } = useSessionStorage('cartProducts');

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    refetch();
    setSucceedPayment(JSON.parse(searchParams.get('success')!));
    setCanceledPayment(JSON.parse(searchParams.get('cancel')!));
    if (succeedPayment) {
      data?.products.data.forEach((product: ProductEntity) => {
        handleProduct(product.id, product.attributes!.isLiked!, false, '', '', 1, 'cart');
      });
    }
  }, [data, refetch, cartCounter, handleProduct, searchParams, succeedPayment]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <PageContainer style={{ paddingTop: '4rem' }}>
      <PageWrapper>
        {(activeUser && !data.products.data.length) ||
        (!activeUser && !getLatestStoredValue('cartProducts').data.length) ? (
          <Empty name='shopping cart' />
        ) : (
          <>
            <CartTable
              products={activeUser ? data.products.data : getLatestStoredValue('cartProducts').data}
              target='cart'
            />
            <CartTotals data={data} target='cart' />
          </>
        )}
        {succeedPayment && (
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <Alert severity='success'>
              <AlertTitle>Success</AlertTitle>
              The payment has been Succeed! 🎉🤗
            </Alert>
          </Backdrop>
        )}
        {canceledPayment && (
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <Alert severity='error'>
              <AlertTitle>Error</AlertTitle>
              The payment has been Canceled! 😒
            </Alert>
          </Backdrop>
        )}
        <Toast />
      </PageWrapper>
    </PageContainer>
  );
};

export default ShoppingCart;
