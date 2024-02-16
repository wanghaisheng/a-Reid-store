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
import { useState } from 'react';
import { products } from './_data';
import StyledButton from '../../components/Buttons/StyledButton';

const product = products[0];

const Container = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '40%',
  },
}));

const ProductCartDetails = () => {
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);

  const handleChangeSize = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };
  const handleChangeColor = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <Container>
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: '1rem' }}>
        {product.name}
      </Typography>
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: '1rem' }}>
        $ {product.price}
      </Typography>
      <Typography variant='body1' sx={{ color: 'gray.dark', mb: '4rem' }}>
        $ {product.desc}
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
            <Button>{count}</Button>
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
          color: 'white',
          bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'black' },
        }}
        onClick={handleOpenModal}
      >
        ADD TO CART
      </StyledButton>
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
        <Stack sx={{ width: '30%' }} spacing={2}>
          <Alert
            severity='success'
            action={
              <Button color='inherit' size='small' onClick={handleCloseModal}>
                OK
              </Button>
            }
          >
            <AlertTitle>Success</AlertTitle>
            {product.name} is added to cart!
          </Alert>
        </Stack>
      </Modal>
    </Container>
  );
};

export default ProductCartDetails;
