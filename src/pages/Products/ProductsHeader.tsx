import { IconButton, InputBase, Paper, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledProductsHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  '& .filterButtons': {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',

    '& .filterItem': {
      color: 'white',
      fontSize: '1.6rem',
      position: 'relative',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      '&::before, &::after': {
        position: 'absolute',
        width: '100%',
        height: '1px',
        background: 'white',
        top: '100%',
        left: 0,
        pointerEvents: 'none',
      },
      '&::before': {
        content: '""',
        transformOrigin: '50% 100%',
        transition: 'clip-path 0.3s, transform 0.3s cubic-bezier(0.2, 1, 0.8, 1)',
        clipPath:
          'polygon(0% 0%, 0% 100%, 0 100%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%, 100% 100%, 100% 0%)',
      },
      '&:hover::before': {
        transform: 'translate3d(0, 2px, 0) scale3d(1.08, 2, 1)',
        clipPath:
          'polygon(0% 0%, 0% 100%, 50% 100%, 50% 0, 50% 0, 50% 100%, 50% 100%, 0 100%, 100% 100%, 100% 0%)',
      },
      '& span': {
        display: 'inline-block',
        transition: 'transform 0.3s cubic-bezier(0.2, 1, 0.8, 1)',
      },
      '&:hover span': {
        transform: 'translate3d(0, -2px, 0)',
      },
      '&.active': {
        color: 'white',
        '&::before, &::after': {
          background: 'white',
          transform: 'translate3d(0, 2px, 0) scale3d(1.08, 2, 1)',
          clipPath:
            'polygon(0% 0%, 0% 100%, 50% 100%, 50% 0, 50% 0, 50% 100%, 50% 100%, 0 100%, 100% 100%, 100% 0%)',
        },
        '& span': {
          transform: 'translate3d(0, -2px, 0)',
        },
      },
    },
  },
}));

const ProductsHeader = () => {
  const handleFilter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const filterItems = document.querySelectorAll('.filterButtons .filterItem');
    for (const item of filterItems) item.classList.remove('active');
    const activeItem = (e.target as HTMLSpanElement).closest('.filterItem')!;
    activeItem.classList.add('active');
  };

  return (
    <StyledProductsHeader>
      <ul className='filterButtons'>
        <li className='filterItem active' onClick={handleFilter}>
          <span>All Products</span>
        </li>
        <li className='filterItem' onClick={handleFilter}>
          <span>Women</span>
        </li>
        <li className='filterItem' onClick={handleFilter}>
          <span>Men</span>
        </li>
        <li className='filterItem' onClick={handleFilter}>
          <span>Bag</span>
        </li>
        <li className='filterItem' onClick={handleFilter}>
          <span>Shoes</span>
        </li>
        <li className='filterItem' onClick={handleFilter}>
          <span>Watches</span>
        </li>
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
        />
      </Paper>
    </StyledProductsHeader>
  );
};

export default ProductsHeader;
