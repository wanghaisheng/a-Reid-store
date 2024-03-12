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
import { useState } from 'react';
import StyledButton from '../../components/Buttons/StyledButton';
import { useAsideDrawer } from '../../graphql/hooks';
import { ApolloError } from '@apollo/client';
import { Maybe, ProductEntity } from '../../gql/graphql';
import { motion } from 'framer-motion';

const Container = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '40%',
  },
}));

type ProductCartDetailsProps = {
  loading: boolean;
  error: ApolloError | undefined;
  product: ProductEntity;
};

const ProductCartDetails = ({ loading, error, product }: ProductCartDetailsProps) => {
  const [size, setSize] = useState<Maybe<string> | undefined>(product.attributes?.size);
  const [color, setColor] = useState<Maybe<string> | undefined>(product.attributes?.color);
  const [count, setCount] = useState<Maybe<number> | undefined>(product.attributes?.cartCounter);
  const { handleWishlistProduct, handleCartProduct } = useAsideDrawer();

  const handleChangeSize = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };
  const handleChangeColor = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Container>
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: '1rem' }}>
        {product.attributes!.name.length > 30
          ? product.attributes?.name.substring(0, 30) + '...'
          : product.attributes?.name}
      </Typography>
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: '1rem' }}>
        $ {product.attributes?.price}
      </Typography>
      <Typography variant='body1' sx={{ color: 'gray.dark', mb: '4rem' }}>
        $ {product.attributes?.desc}
      </Typography>
      <Box sx={{ mb: '2rem' }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Size</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={size!}
            label='Size'
            onChange={handleChangeSize}
          >
            <MenuItem value='S'>Size S</MenuItem>
            <MenuItem value='M'>Size M</MenuItem>
            <MenuItem value='L'>Size L</MenuItem>
            <MenuItem value='XL'>Size XL</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: '2rem' }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Color</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={color!}
            label='Color'
            onChange={handleChangeColor}
          >
            <MenuItem value='Red'>Red</MenuItem>
            <MenuItem value='Blue'>Blue</MenuItem>
            <MenuItem value='White'>White</MenuItem>
            <MenuItem value='Grey'>Grey</MenuItem>
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
            >
              <RemoveIcon fontSize='small' />
            </Button>
            <Button sx={{ fontSize: '1.8rem !important' }}>{count}</Button>
            <Button
              aria-label='increase'
              onClick={() => {
                setCount(count! + 1);
              }}
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
          bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'black' },
        }}
        onClick={() => handleCartProduct(product.id, false, true, size!, color!, count!)}
      >
        {product.attributes?.isAddedToCart ? 'UPDATE CART' : 'ADD TO CART'}
      </StyledButton>
      <Box>
        {!product.attributes?.isAddedToCart &&
          (product.attributes?.isLiked ? (
            <FavoriteIcon
              sx={{ fontSize: '3rem', color: 'primary.main', cursor: 'pointer', outline: 0 }}
              onClick={() => {
                handleWishlistProduct(product.id, false, product.attributes!.isAddedToCart!);
              }}
              component={motion.svg}
              whileTap={{ scale: 0.75 }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ fontSize: '3rem', color: 'primary.main', cursor: 'pointer', outline: 0 }}
              onClick={() => {
                handleWishlistProduct(product.id, true, product.attributes!.isAddedToCart!);
              }}
              component={motion.svg}
              whileTap={{ scale: 0.75 }}
            />
          ))}
      </Box>
    </Container>
  );
};

export default ProductCartDetails;
