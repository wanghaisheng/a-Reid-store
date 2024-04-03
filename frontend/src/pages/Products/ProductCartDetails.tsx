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
import { Maybe } from '../../gql/graphql';
import { motion } from 'framer-motion';
import { GET_PRODUCT } from '../../graphql/queries';

const Container = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '40%',
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
    handleProduct(
      data.product.data.id,
      isLiked,
      data.product.data.attributes!.isAddedToCart!,
      size as string,
      color as string,
      count as number,
      'wishlist'
    );
  };

  if (loading) return <p>Loading...</p>;
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
        onClick={() =>
          handleProduct(data.product.data.id, false, true, size!, color!, count!, 'cart')
        }
      >
        {data.product.data.attributes?.isAddedToCart ? 'UPDATE CART' : 'ADD TO CART'}
      </StyledButton>
      <Box>
        {!data.product.data.attributes?.isAddedToCart &&
          (data.product.data.attributes?.isLiked ? (
            <FavoriteIcon
              sx={{ fontSize: '3rem', color: 'primary.main', cursor: 'pointer', outline: 0 }}
              onClick={() => handleFavoriteProduct(false)}
              component={motion.svg}
              whileTap={{ scale: 0.75 }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ fontSize: '3rem', color: 'primary.main', cursor: 'pointer', outline: 0 }}
              onClick={() => handleFavoriteProduct(true)}
              component={motion.svg}
              whileTap={{ scale: 0.75 }}
            />
          ))}
      </Box>
    </Container>
  );
};

export default ProductCartDetails;
