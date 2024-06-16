import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import StyledButton from '../../components/Buttons/StyledButton';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { useQuery } from '@apollo/client';
import { Maybe, ProductEntity } from '../../gql/graphql';
import { motion } from 'framer-motion';
import { GET_PRODUCT } from '../../graphql/queries';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { Spinner } from '../../components/Spinners';
import { useTranslation } from 'react-i18next';

const Container = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '40%',
  },
  '& .styledButton': {
    color: theme.palette.mode == 'light' ? 'primary.main' : 'white',
    borderColor: theme.palette.mode == 'light' ? 'primary.main' : 'white',
    '&:hover': {
      borderColor: theme.palette.mode == 'light' ? 'primary.main' : 'white',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
      color: theme.palette.mode == 'light' ? 'auto' : 'white',
      borderColor: theme.palette.mode == 'light' ? 'auto' : 'white',
    },
  },
  '& .label': {
    color: theme.palette.mode == 'light' ? 'auto' : 'white',
    '&.Mui-focused': {
      color: theme.palette.mode == 'light' ? 'auto' : 'white',
    },
  },
}));

const ProductCartDetails = ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });
  const [size, setSize] = useState<Maybe<string> | undefined>(data.product?.data.attributes?.size);
  const [color, setColor] = useState<Maybe<string> | undefined>(
    data.product.data.attributes?.color
  );
  const [count, setCount] = useState<Maybe<number> | undefined>(0);
  const { loadingWishlistProducts, errorWishlistProducts, wishlistProducts, handleWishlist } =
    useAsideDrawer();
  const { loadingCartProducts, errorCartProducts, cartProducts, refreshCartProducts, handleCart } =
    useAsideDrawer();
  const { activeUser } = useAuth();
  const { getLatestStoredValue, setValue } = useSessionStorage('wishlistProducts');
  const {
    getLatestStoredValue: getLatestStoredCartValue,
    setValue: setCartValue,
    removeSessionProduct: removeCartProduct,
  } = useSessionStorage('cartProducts');
  const cartProduct = cartProducts?.find(
    (item: { attributes: { productId: string } }) => item.attributes.productId == id
  );
  const foundCartProduct = getLatestStoredCartValue('cartProducts').data?.find(
    (e: ProductEntity) => e.id == id
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (activeUser && cartProduct) {
      setSize(cartProduct.attributes?.size);
      setColor(cartProduct.attributes?.color);
      setCount(cartProduct.attributes?.cartCounter);
    }
    if (!activeUser && foundCartProduct) {
      setSize(foundCartProduct.attributes?.size);
      setColor(foundCartProduct.attributes?.color);
      setCount(foundCartProduct.attributes?.cartCounter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser, cartProduct]);

  const handleChangeSize = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };
  const handleChangeColor = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  const handleFavoriteProduct = (isLiked: boolean) => {
    if (activeUser) {
      handleWishlist(isLiked, data.product.data);
    } else {
      setValue(data.product.data);
    }
  };

  const resetValues = () => {
    setSize(undefined);
    setColor(undefined);
    setCount(0);
  };

  const handleCartProduct = async () => {
    if (activeUser) {
      if (!cartProduct && count! > 0) {
        const createCartProduct = {
          data: {
            users_permissions_user: activeUser?.user.id,
            productId: id,
            name: data.product.data.attributes?.name,
            size: size,
            color: color,
            cartCounter: count,
            img: data.product.data.attributes?.img,
            price: data.product.data.attributes?.price,
          },
        };
        await handleCart('CREATE', createCartProduct);
        const foundProduct = wishlistProducts?.find((e: ProductEntity) => e.id == id);
        if (foundProduct) handleFavoriteProduct(false);
      }
      if (cartProduct && count! > 0) {
        const updateCartProduct = {
          id: cartProduct.id,
          data: {
            users_permissions_user: cartProduct.attributes.users_permissions_user.data.id,
            productId: cartProduct.attributes.productId,
            name: cartProduct.attributes.name,
            size: size,
            color: color,
            cartCounter: count,
            cart: cartProduct.attributes.cart.data.id,
          },
        };
        await handleCart('UPDATE', updateCartProduct);
      }
      if (cartProduct && count! == 0) {
        await handleCart('DELETE', { id: cartProduct.id, name: cartProduct.attributes.name });
        resetValues();
      }
      refreshCartProducts();
    } else {
      if (count! > 0) {
        const sessionProduct = {
          __typename: 'ProductEntity',
          id: data.product.data.id,
          attributes: {
            ...data.product.data.attributes,
            size,
            color,
            cartCounter: count,
          },
        };
        setCartValue(sessionProduct);
      } else {
        removeCartProduct(foundCartProduct, 'cartProducts');
        resetValues();
      }
    }
  };

  const LikeButton = () => {
    const renderIcon = (condition: boolean | null | undefined) => {
      if (condition) {
        return (
          <FavoriteIcon
            sx={(theme) => ({
              fontSize: '3rem',
              color: theme.palette.mode == 'light' ? 'primary.main' : 'white',
              cursor: 'pointer',
              outline: 0,
            })}
            onClick={() => handleFavoriteProduct(false)}
            component={motion.svg}
            whileTap={{ scale: 0.75 }}
          />
        );
      } else {
        return (
          <FavoriteBorderIcon
            sx={(theme) => ({
              fontSize: '3rem',
              color: theme.palette.mode == 'light' ? 'primary.main' : 'white',
              cursor: 'pointer',
              outline: 0,
            })}
            onClick={() => handleFavoriteProduct(true)}
            component={motion.svg}
            whileTap={{ scale: 0.75 }}
          />
        );
      }
    };

    if (activeUser) {
      if (loadingWishlistProducts) return false;
      if (errorWishlistProducts) return false;
      const foundProduct = wishlistProducts?.find((e: ProductEntity) => e.id == id);
      return renderIcon(Boolean(foundProduct));
    } else {
      const foundProduct = getLatestStoredValue('wishlistProducts').data?.find(
        (e: ProductEntity) => e.id == id
      );
      return renderIcon(Boolean(foundProduct));
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;

  if (activeUser) {
    if (loadingCartProducts) return <Spinner />;
    if (errorCartProducts) return false;
  }

  return (
    <Container>
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: '1rem' }}>
        {data.product.data.attributes!.name.length > 30
          ? data.product.data.attributes?.name.substring(0, 30) + '...'
          : data.product.data.attributes?.name}
      </Typography>
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: '1rem' }}>
        $ {data.product.data.attributes?.price}
      </Typography>
      <Typography variant='body1' sx={{ color: 'gray.dark', mb: '4rem' }}>
        $ {data.product.data.attributes?.desc}
      </Typography>
      <Box sx={{ mb: '2rem' }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label' className='label'>
            Size
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={size!}
            label={t('Size')}
            onChange={handleChangeSize}
          >
            <MenuItem value='S'>{t('Size')} S</MenuItem>
            <MenuItem value='M'>{t('Size')} M</MenuItem>
            <MenuItem value='L'>{t('Size')} L</MenuItem>
            <MenuItem value='XL'>{t('Size')} XL</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: '2rem' }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label' className='label'>
            Color
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={color!}
            label={t('Color')}
            onChange={handleChangeColor}
          >
            <MenuItem value='Red'>{t('Red')}</MenuItem>
            <MenuItem value='Blue'>{t('Blue')}</MenuItem>
            <MenuItem value='White'>{t('White')}</MenuItem>
            <MenuItem value='Grey'>{t('Grey')}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: '2rem' }}>
        <div>
          <ButtonGroup>
            <Button
              aria-label='reduce'
              onClick={() => {
                setCount(Math.max(count! - 1, 0));
              }}
              className='styledButton'
            >
              <RemoveIcon fontSize='small' />
            </Button>
            <Button
              sx={{
                fontSize: '1.8rem !important',
              }}
              className='styledButton'
            >
              {count}
            </Button>
            <Button
              aria-label='increase'
              onClick={() => {
                setCount(count! + 1);
              }}
              className='styledButton'
            >
              <AddIcon fontSize='small' />
            </Button>
          </ButtonGroup>
        </div>
      </Box>
      <StyledButton
        sx={(theme) => ({
          p: '1rem 3rem',
          mb: '2rem',
          color: 'white',
          bgcolor: theme.palette.mode == 'light' ? 'primary.main' : '#2F1C40',
          '&:hover': { bgcolor: 'black' },
        })}
        onClick={handleCartProduct}
        component={motion.div}
        whileTap={{ scale: 0.9 }}
      >
        {activeUser
          ? cartProducts?.findIndex(
              (item: { attributes: { productId: string } }) => item.attributes.productId == id
            ) != -1
            ? t('UPDATE_CART')
            : t('ADD_TO_CART')
          : foundCartProduct
          ? t('UPDATE_CART')
          : t('ADD_TO_CART')}
      </StyledButton>
      {activeUser && !cartProduct ? (
        <Box>
          <LikeButton />
        </Box>
      ) : (
        !activeUser &&
        !foundCartProduct && (
          <Box>
            <LikeButton />
          </Box>
        )
      )}
    </Container>
  );
};

export default ProductCartDetails;
