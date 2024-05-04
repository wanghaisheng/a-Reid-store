import { Box, Typography, styled } from '@mui/material';
import StyledButton from '../../../components/Buttons/StyledButton';
import ProductsSlider from './ProductsSlider';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_CATEGORY } from '../../../graphql/queries';
import { MouseEvent, useState } from 'react';
import { CategoryEntity, Maybe } from '../../../gql/graphql';
import { Spinner } from '../../../components/Spinners';

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
  const { loading, error, data: categoriesData } = useQuery(GET_CATEGORIES);
  const [categoryId, setCategoryId] = useState('1');

  const PAGE_SIZE = 100;

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
    refetch: getCategoryProducts,
  } = useQuery(GET_CATEGORY, {
    variables: { id: categoryId, limit: PAGE_SIZE },
  });

  const handleFilter = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    categoryId: Maybe<string> | undefined
  ) => {
    const filterItems = document.querySelectorAll('.filterButtons .filterItem');
    for (const item of filterItems) item.classList.remove('active');
    const activeItem = (e.target as HTMLSpanElement).closest('.filterItem')!;
    activeItem.classList.add('active');
    setCategoryId(categoryId!);
    getCategoryProducts({ id: categoryId, limit: PAGE_SIZE });
  };

  if (loading) return false;
  if (error) return false;

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
          {categoriesData.categories.data.map((category: CategoryEntity) => (
            <FilterButton
              key={category.id}
              className={`filterItem ${category.id == categoryId ? 'active' : null}`}
              onClick={(e) => handleFilter(e, category.id)}
            >
              <span>{category.attributes?.categoryName}</span>
            </FilterButton>
          ))}
        </Box>
        {productsLoading && <Spinner place='productsSlider' />}
        {productsError && <p>Error : {productsError.message}</p>}
        {productsData && <ProductsSlider productsData={productsData} />}
      </div>
    </StyledContainer>
  );
};

export default Products;
