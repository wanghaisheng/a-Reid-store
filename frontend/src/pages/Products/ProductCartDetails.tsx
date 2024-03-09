import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import StyledButton from '../../components/Buttons/StyledButton';
import { useWishlist } from './hooks';
import { ApolloError } from '@apollo/client';
import { ProductEntity } from '../../gql/graphql';
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
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const { handleWishlistProduct } = useWishlist();

  const handleChangeSize = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };
  const handleChangeColor = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Container>
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: '1rem' }}>
        {product.attributes?.name}
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
            value={size}
            label='Size'
            onChange={handleChangeSize}
          >
            <MenuItem value={10}>Size S</MenuItem>
            <MenuItem value={20}>Size M</MenuItem>
            <MenuItem value={30}>Size L</MenuItem>
            <MenuItem value={30}>Size XL</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: '2rem' }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Color</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={color}
            label='Color'
            onChange={handleChangeColor}
          >
            <MenuItem value={10}>Red</MenuItem>
            <MenuItem value={20}>Blue</MenuItem>
            <MenuItem value={30}>White</MenuItem>
            <MenuItem value={30}>Grey</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: '2rem' }}>
        <div>
          <ButtonGroup>
            <Button
              aria-label='reduce'
              onClick={() => {
                setCount(Math.max(count - 1, 0));
              }}
            >
              <RemoveIcon fontSize='small' />
            </Button>
            <Button sx={{ fontSize: '1.8rem !important' }}>{count}</Button>
            <Button
              aria-label='increase'
              onClick={() => {
                setCount(count + 1);
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
        onClick={handleOpenModal}
      >
        ADD TO CART
      </StyledButton>
      <Box>
        {product.attributes?.isLiked ? (
          <FavoriteIcon
            sx={{ fontSize: '3rem', color: 'primary.main', cursor: 'pointer', outline: 0 }}
            onClick={() => {
              handleWishlistProduct(product.id, false);
            }}
            component={motion.svg}
            whileTap={{ scale: 0.75 }}
          />
        ) : (
          <FavoriteBorderIcon
            sx={{ fontSize: '3rem', color: 'primary.main', cursor: 'pointer', outline: 0 }}
            onClick={() => {
              handleWishlistProduct(product.id, true);
            }}
            component={motion.svg}
            whileTap={{ scale: 0.75 }}
          />
        )}
      </Box>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        disableScrollLock={true}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={(theme) => ({
            width: '80%',
            [theme.breakpoints.up('sm')]: { width: '60%' },
            [theme.breakpoints.up('md')]: { width: '40%' },
            [theme.breakpoints.up('lg')]: { width: '30%' },
          })}
          spacing={2}
        >
          <Alert
            severity='success'
            action={
              <Button color='inherit' size='small' onClick={handleCloseModal}>
                OK
              </Button>
            }
          >
            <AlertTitle>Success</AlertTitle>
            {product.attributes?.name} is added to cart!
          </Alert>
        </Stack>
      </Modal>
    </Container>
  );
};

export default ProductCartDetails;
