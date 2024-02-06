import { Box, Typography, styled } from '@mui/material';
import StyledButton from '../../../components/Buttons/StyledButton';
import ProductsSlider from './ProductsSlider';
import products from './_data';

const StyledContainer = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  minHeight: '100vh',
  background: theme.palette.gray.main,
  display: 'flex',
  alignItems: 'center',
  '& .content': {
    padding: '5rem 0',
    width: '100%',
    minHeight: '95vh',
    zIndex: 2,
  },
}));

const FilterButton = styled(StyledButton)({
  color: 'black',
  border: '2px solid white',
  width: '13.1rem',
  margin: '0.5rem 0',
  '&:hover, &.active': {
    background: 'white',
  },
});

const Products = () => {
  return (
    <StyledContainer>
      <div className='content'>
        <Typography variant='h3' color='black' sx={{ textAlign: 'center', lineHeight: 1 }}>
          Our Lovely
          <br />
          Products
        </Typography>
        <Box
          sx={{
            margin: '4rem auto 0',
            padding: '1rem',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-evenly',
            maxWidth: '850px',
          }}
        >
          <FilterButton className='active'>All Products</FilterButton>
          <FilterButton>Women</FilterButton>
          <FilterButton>Men</FilterButton>
          <FilterButton>Bag</FilterButton>
          <FilterButton>Shoes</FilterButton>
          <FilterButton>Watches</FilterButton>
        </Box>
        <ProductsSlider products={products} />
      </div>
    </StyledContainer>
  );
};

export default Products;
