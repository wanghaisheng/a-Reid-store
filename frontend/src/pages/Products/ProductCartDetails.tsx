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
  useTheme,
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
  const [count, setCount] = useState<Maybe<number> | undefined>(
    data.product.data.attributes?.cartCounter
  );
  const { handleProduct } = useAsideDrawer();
  const { activeUser } = useAuth();
  const { getLatestStoredValue, setValue } = useSessionStorage('wishlistProducts');
  const { getLatestStoredValue: getLatestStoredCartValue, setValue: setCartValue } =
    useSessionStorage('cartProducts');
  const foundCartProduct = getLatestStoredCartValue('cartProducts').data?.find(
    (e: ProductEntity) => e.id == id
  );
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    setSize(data.product.data.attributes?.size);
    setColor(data.product.data.attributes?.color);
    setCount(data.product.data.attributes?.cartCounter);
  }, [data]);

  const handleChangeSize = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };
  const handleChangeColor = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  const handleFavoriteProduct = (isLiked: boolean) => {
    if (activeUser) {
      handleProduct(
        data.product.data.id,
        isLiked,
        data.product.data.attributes!.isAddedToCart!,
        size as string,
        color as string,
        count as number,
        'wishlist'
      );
    } else {
      setValue(data.product.data);
    }
  };

  const handleCartProduct = () => {
    if (activeUser) {
      handleProduct(data.product.data.id, false, true, size!, color!, count!, 'cart');
    } else {
      const sessionProduct: ProductEntity = {
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
    }
  };

  const LikeButton = () => {
    const renderIcon = (condition: boolean | null | undefined) => {
      if (condition) {
        return (
          <FavoriteIcon
            sx={{
              fontSize: '3rem',
              color: theme.palette.mode == 'light' ? 'primary.main' : 'white',
              cursor: 'pointer',
              outline: 0,
            }}
            onClick={() => handleFavoriteProduct(false)}
            component={motion.svg}
            whileTap={{ scale: 0.75 }}
          />
        );
      } else {
        return (
          <FavoriteBorderIcon
            sx={{
              fontSize: '3rem',
              color: theme.palette.mode == 'light' ? 'primary.main' : 'white',
              cursor: 'pointer',
              outline: 0,
            }}
            onClick={() => handleFavoriteProduct(true)}
            component={motion.svg}
            whileTap={{ scale: 0.75 }}
          />
        );
      }
    };

    if (activeUser) {
      if (!data.product.data.attributes?.isAddedToCart)
        return renderIcon(data.product.data.attributes?.isLiked);
    } else {
      const foundProduct = getLatestStoredValue('wishlistProducts').data?.find(
        (e: ProductEntity) => e.id == id
      );
      return renderIcon(Boolean(foundProduct));
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;

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
                setCount(Math.max(count! - 1, 1));
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
        sx={{
          p: '1rem 3rem',
          mb: '2rem',
          color: 'white',
          bgcolor: theme.palette.mode == 'light' ? 'primary.main' : '#2F1C40',
          '&:hover': { bgcolor: 'black' },
        }}
        onClick={handleCartProduct}
      >
        {activeUser
          ? data.product.data.attributes?.isAddedToCart
            ? t('UPDATE_CART')
            : t('ADD_TO_CART')
          : foundCartProduct
          ? t('UPDATE_CART')
          : t('ADD_TO_CART')}
      </StyledButton>
      {activeUser ? (
        <Box>
          <LikeButton />
        </Box>
      ) : (
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
