import { styled } from '@mui/material';
import { useAppSelector } from '../../app/store';
import ProductCard from './ProductCard';
import StyledButton from '../../components/Buttons/StyledButton';
import { useProductsQuery } from '../../graphql/hooks';

const StyledProductsGrid = styled('div')(({ theme }) => ({
  margin: '6rem auto',
  display: 'grid',
  justifyItems: 'center',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridTemplateRows: 'repeat(auto-fill, 1fr)',
  gap: '3rem',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

const ProductsGrid = () => {
  const { getCategoryProducts } = useProductsQuery();
  const { loading, error, products, categoryId, pagination } = useAppSelector(
    (store) => store.products
  );

  const handleLoadMore = () => {
    getCategoryProducts({
      id: categoryId,
      limit: products.length + pagination.pageSize,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <StyledProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id} id={product.id} />
        ))}
      </StyledProductsGrid>
      {pagination.total > products.length && (
        <div style={{ textAlign: 'center' }}>
          <StyledButton
            sx={{
              bgcolor: 'gray.main',
              color: 'black',
              p: '1rem 5rem',
              '&:hover': { bgcolor: 'black', color: 'gray.main' },
            }}
            onClick={handleLoadMore}
          >
            LOAD MORE
          </StyledButton>
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
