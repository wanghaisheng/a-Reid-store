import { useContext, useEffect, useState } from 'react';
import PageContainer from '../../components/PageContainer';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../graphql/queries';
import { StyledTableCell, StyledTableRow } from '../ShoppingCart/CartTable';
import { InputMaybe, OrderEntity, Scalars } from '../../gql/graphql';
import axios, { AxiosResponse } from 'axios';
import Toast from '../../components/Toasts/Toast';
import { useAppDispatch } from '../../app/store';
import { openToast } from '../../app/features/toastSlice';
import Button from '../../components/AsideDrawer/Button';
import { Spinner } from '../../components/Spinners';
import { useTranslation } from 'react-i18next';
import { LocaleContext } from '../../contexts/locale/LocaleContext';

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem',
  borderTop: '2px solid white',
  borderRadius: '6rem',

  '& .welcome, & .logoutIcon': {
    color: 'white',
    fontWeight: 'bold',
  },
});

const MyAccount = () => {
  const { activeUser, logoutUser } = useAuth();
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_ORDERS, {
    variables: { userId: activeUser?.user.id },
    context: {
      headers: {
        Authorization: `Bearer ${activeUser?.jwt}`,
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paymentIntents, setPaymentIntents] = useState<AxiosResponse>();
  const [cancelLoading, setCancelLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);

  useEffect(() => {
    if (!activeUser) navigate('/login', { replace: true });
  }, [activeUser, navigate]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const paymentIntentsData = await axios.post(
  //         `${import.meta.env.VITE_APP_SERVER_URL}/api/orders`,
  //         {
  //           stripeId: 'some value',
  //           id: 'some value',
  //           flag: 'get',
  //         }
  //       );
  //       setPaymentIntents(paymentIntentsData);
  //     } catch (error) {
  //       console.error('Error canceling PaymentIntent:', error);
  //     }
  //   })();
  // }, []);

  const cancelPayment = async (stripeId: string, id: string, customOrderId: string) => {
    if (activeUser) {
      setCancelLoading(true);
      try {
        const paymentIntentsCancel = await axios.post(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/orders`,
          {
            stripeId,
            id,
            flag: 'post',
            paymentIntentId: paymentIntents?.data.data.find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (PI: any) => PI.metadata.customOrderId == customOrderId
            ).id,
          }
        );
        refetch();
        if (paymentIntentsCancel.data.status == 'succeeded')
          dispatch(openToast({ type: 'success', message: t('CanceledOrder') }));
      } catch (error) {
        console.error('Error canceling PaymentIntent:', error);
        if (axios.isAxiosError(error))
          dispatch(openToast({ type: 'error', message: error.response?.data.error.message }));
      }
      setCancelLoading(false);
    }
  };

  if (loading || !paymentIntents || cancelLoading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;

  const filteredOrders = data.orders.data.filter((order: OrderEntity) => {
    if (
      paymentIntents?.data.data.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (PI: any) => PI.metadata.customOrderId == order.attributes?.customOrderId
      )?.id
    )
      return order;
  });

  return (
    <PageContainer>
      <Header style={lang == 'ar' ? { flexDirection: 'row-reverse' } : {}}>
        <Typography variant='h5' className='welcome'>
          {t('Welcome')}, {activeUser && activeUser?.user.username} 👋
        </Typography>
        <Tooltip title={t('Logout')}>
          <IconButton sx={{ border: '2px solid white' }} onClick={logoutUser}>
            <LogoutIcon className='logoutIcon' />
          </IconButton>
        </Tooltip>
      </Header>
      {filteredOrders.length ? (
        <div className='table'>
          <Typography
            variant='h4'
            sx={{
              color: 'white',
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: lang == 'ar' ? 'row-reverse' : 'row',
            }}
          >
            <span>{t('MyOrders')}</span>
            <span>
              {filteredOrders.length} {t('Orders')}
            </span>
          </Typography>
          {
            <TableContainer component={Paper}>
              <Table aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>{t('ORDER_ID')}</StyledTableCell>
                    <StyledTableCell align='center'>{t('ITEMS')}</StyledTableCell>
                    <StyledTableCell align='center'>{t('STATUS')}</StyledTableCell>
                    <StyledTableCell align='center'>{t('AMOUNT')}</StyledTableCell>
                    <StyledTableCell align='center'>{t('CREATED_AT')}</StyledTableCell>
                    <StyledTableCell align='center'>{t('CANCELATION')}</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order: OrderEntity) => (
                    <StyledTableRow key={order.id}>
                      <StyledTableCell align='center'>{order.id}</StyledTableCell>
                      <StyledTableCell align='center'>
                        {order.attributes?.items.map(
                          (item: InputMaybe<Scalars['JSON']['input']>) => (
                            <span key={item.price_data.product_data.name}>
                              {item.price_data.product_data.name} <br />
                            </span>
                          )
                        )}
                      </StyledTableCell>
                      <StyledTableCell align='center'>Succeeded</StyledTableCell>
                      <StyledTableCell align='center'>
                        {Math.ceil(order.attributes!.amount!)}
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        {new Date(order.attributes?.createdAt).toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <Tooltip title={t('CancelOrder')}>
                          <IconButton
                            sx={{ border: '2px solid white' }}
                            onClick={() =>
                              cancelPayment(
                                order.attributes?.stripeId as string,
                                order.id as string,
                                order.attributes?.customOrderId as string
                              )
                            }
                          >
                            <DeleteForeverOutlinedIcon color='error' className='logoutIcon' />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
        </div>
      ) : (
        <>
          <Typography variant='h4' sx={{ color: 'white', marginTop: '8rem', textAlign: 'center' }}>
            {t('NoOrdersYet')}
          </Typography>
          <Link to={`${window.origin}/products`} style={{ textDecoration: 'none' }}>
            <Button
              className='button'
              sx={(theme) => ({
                margin: '4rem auto',
                display: 'block',
                '&:hover': {
                  background: theme.palette.mode == 'light' ? 'black' : 'white',
                  color: theme.palette.mode == 'light' ? 'white' : 'black',
                },
              })}
            >
              {t('START_SHOPPING')}
            </Button>
          </Link>
        </>
      )}
      <Toast />
    </PageContainer>
  );
};

export default MyAccount;
