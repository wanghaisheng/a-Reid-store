import { Box, Typography, styled } from '@mui/material';
import StyledButton from '../../../components/Buttons/StyledButton';
import ProductsSlider from './ProductsSlider';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_CATEGORY } from '../../../graphql/queries';
import { MouseEvent, useState, useContext, useRef } from 'react';
import { CategoryEntity, Maybe } from '../../../gql/graphql';
import { Spinner } from '../../../components/Spinners';
import { useTranslation } from 'react-i18next';
import { LocaleContext } from '../../../contexts/locale/LocaleContext';
import { motion } from 'framer-motion';
import Toast from '../../../components/Toasts/Toast';

const StyledContainer = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  minHeight: '100vh',
  background: theme.palette.mode == 'light' ? theme.palette.gray.main : '#09090B',
  display: 'flex',
  alignItems: 'center',
  '& .content': {
    padding: '5rem 0',
    width: '100%',
    minHeight: '95vh',
    zIndex: 2,
  },
}));

const FilterButton = styled(motion(StyledButton))(({ theme }) => ({
  color: theme.palette.mode == 'dark' ? 'white' : 'black',
  border: '2px solid white',
  width: '13.1rem',
  margin: '0.5rem 0',
  '&:hover, &.active': {
    color: 'black',
    background: 'white',
  },
}));

const Products = () => {
  const { loading, error, data: categoriesData } = useQuery(GET_CATEGORIES);
  const [categoryId, setCategoryId] = useState('1');
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);
  const FilterButtonRef = useRef(null!);

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

  const titleVariants = {
    initial: {
      opacity: 0,
      y: '15rem',
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <StyledContainer>
      <div className='content'>
        <Typography
          variant='h3'
          color='black'
          sx={(theme) => ({
            textAlign: 'center',
            lineHeight: 1,
            color: theme.palette.mode == 'dark' ? 'white' : 'auto',
          })}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            variants={titleVariants}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('OurLovely')}
          </motion.span>
          <br />
          <motion.span
            style={{ display: 'inline-block' }}
            variants={titleVariants}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('Products')}
          </motion.span>
        </Typography>
        <Box
          sx={{
            margin: '4rem auto 0',
            padding: '1rem',
            display: 'flex',
            flexFlow: lang == 'ar' ? 'row-reverse wrap' : 'row wrap',
            justifyContent: 'space-evenly',
            maxWidth: '850px',
          }}
        >
          {categoriesData.categories.data.map((category: CategoryEntity, index: number) => (
            <FilterButton
              ref={FilterButtonRef}
              key={category.id}
              className={`filterItem ${category.id == categoryId ? 'active' : null}`}
              onClick={(e) => handleFilter(e, category.id)}
              style={{
                width: lang == 'ar' ? 'auto' : '13.1rem',
              }}
              initial={{
                opacity: 0,
                scaleX: 0,
                transformOrigin: 'left',
              }}
              whileInView={{
                opacity: 1,
                scaleX: 1,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <span>{t(`${category.attributes?.categoryName}`)}</span>
            </FilterButton>
          ))}
        </Box>
        {productsLoading && <Spinner place='productsSlider' />}
        {productsError && <p>Error : {productsError.message}</p>}
        {productsData && <ProductsSlider productsData={productsData} />}
      </div>
      <Toast />
    </StyledContainer>
  );
};

export default Products;
