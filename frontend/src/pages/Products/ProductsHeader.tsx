import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useProductsQuery } from '../../graphql/hooks';
import { GET_CATEGORIES } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { CategoryEntity, Maybe } from '../../gql/graphql';
import StyledProductsHeader from './StyledProductsHeader';
import { useAppSelector } from '../../app/store';

const ProductsHeader = () => {
  const { getCategoryProducts, refetchPagination, PAGE_SIZE } = useProductsQuery();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const { categoryId } = useAppSelector((store) => store.products);

  const handleFilter = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    categoryId: Maybe<string> | undefined
  ) => {
    const filterItems = document.querySelectorAll('.filterButtons .filterItem');
    for (const item of filterItems) item.classList.remove('active');
    const activeItem = (e.target as HTMLSpanElement).closest('.filterItem')!;
    activeItem.classList.add('active');

    getCategoryProducts({ id: categoryId });
    refetchPagination({ categoryId, limit: PAGE_SIZE });
  };

  if (loading) return false;
  if (error) return false;

  return (
    <StyledProductsHeader>
      <ul className='filterButtons'>
        {data.categories.data.map((category: CategoryEntity) => (
          <li
            key={category.id}
            className={`filterItem ${category.id == categoryId ? 'active' : null}`}
            onClick={(e) => handleFilter(e, category.id)}
          >
            <span>{category.attributes?.categoryName}</span>
          </li>
        ))}
      </ul>
      <Paper
        className='searchBox'
        component='form'
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 400,
          borderRadius: '24px',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, pr: '2rem' }}
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => getCategoryProducts({ name: e.target.value })}
        />
      </Paper>
    </StyledProductsHeader>
  );
};

export default ProductsHeader;
