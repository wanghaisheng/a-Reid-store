import { styled } from '@mui/material';
import { products } from './_data';

const product = products[0];

const Container = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  gap: '2rem',
  [theme.breakpoints.up('md')]: {
    width: '55%',
  },

  '& .thumbs': {
    width: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3rem',
    '& img': {
      width: '100%',
      height: '90px',
      objectFit: 'cover',
      borderRadius: '1rem',
      cursor: 'pointer',
      transition: 'all 0.1s ease',
      '&:hover, &.active ': {
        border: `2px solid ${theme.palette.gray.dark}`,
      },
    },
  },

  '& .mainPhoto': {
    width: 'calc(100% - 70px)',
    '& img': { maxWidth: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.5rem' },
  },
}));

const ProductGalleryBox = () => {
  const handleFilter = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const filterItems = document.querySelectorAll('.thumbs img');
    for (const item of filterItems) item.classList.remove('active');
    (e.target as HTMLImageElement).classList.add('active');

    const mainPhoto = document.querySelector('.mainPhoto img')!;
    mainPhoto.setAttribute('src', (e.target as HTMLImageElement).getAttribute('src')!);
  };

  return (
    <Container>
      <div className='thumbs'>
        {product.thumbs.map((thumb, index) => (
          <img
            src={thumb}
            key={index}
            onClick={handleFilter}
            className={index == 0 ? 'active' : ''}
          />
        ))}
      </div>
      <div className='mainPhoto'>
        <img src={product.img} />
      </div>
    </Container>
  );
};

export default ProductGalleryBox;
