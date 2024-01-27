import { Grid, Theme, styled, useMediaQuery } from '@mui/material';
import Img1 from '../../../assets/pexels-photo-8928928.jpeg';
import Img2 from '../../../assets/pexels-photo-8928928.jpeg';
import Img3 from '../../../assets/pexels-photo-8928928.jpeg';
import Img4 from '../../../assets/Screenshot_121.png';
import Logo from '../../../assets/siteLogo2.png';

const StyledGrid = styled(Grid)(({ theme }) => ({
  position: 'relative',
  background: 'white',
  overflow: 'hidden',
  height: 'calc(150vh + 15rem)',
  paddingTop: '5rem',
  [theme.breakpoints.up('md')]: {
    height: 'calc(100vh + 15rem)',
    padding: '0 0 10rem',
  },
})) as typeof Grid;

const GridItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}) as typeof Grid;

const GridItemContainerOne = styled('div')(({ theme }) => ({
  textAlign: 'center',
  '& p': {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '1.1',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.7rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '-5rem',
      top: '5rem',
    },
  },
  '& .ImagesContainer': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& img': {
    maxWidth: '10rem',
    borderRadius: '1rem',
    position: 'relative',
  },
  '& .Img1': {
    rotate: '-45deg',
    left: '-20rem',
    top: '-2rem',
    [theme.breakpoints.up('sm')]: {
      left: '-25rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '-20rem',
      top: '10rem',
    },
  },
  '& .Img2': {
    rotate: '15deg',
    right: '-20rem',
    top: '-20rem',
    [theme.breakpoints.up('sm')]: {
      right: '-25rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '10rem',
      top: '-10rem',
    },
  },
  '& .Img3': {
    rotate: '45deg',
    right: '-10rem',
    top: '-20rem',
    [theme.breakpoints.up('md')]: {
      left: '10rem',
      top: '15rem',
    },
  },
  '& .Img4': {
    rotate: '5deg',
    left: '-5rem',
    top: '-30rem',
    [theme.breakpoints.up('md')]: {
      left: '-10rem',
      top: '-15rem',
    },
  },
}));

const GridItemContainerTwo = styled(GridItemContainerOne)(({ theme }) => ({
  '& .Img1': {
    rotate: '-20deg',
    left: '-15rem',
    top: '-30rem',
    [theme.breakpoints.up('md')]: {
      left: '-65rem',
      top: '40rem',
    },
  },
  '& .Img2': {
    rotate: '-20deg',
    right: '-22rem',
    top: '-40rem',
    [theme.breakpoints.up('sm')]: {
      right: '-30rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '-40rem',
      top: '15rem',
    },
  },
  '& p': {
    textAlign: 'left',
    position: 'relative',
    top: '-45rem',
    [theme.breakpoints.up('sm')]: {
      right: '-10rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '-48rem',
      top: '17rem',
    },
  },
  '& .Img3': {
    rotate: '-45deg',
    left: '-15rem',
    top: '-45rem',
    [theme.breakpoints.up('sm')]: {
      left: '-30rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '40rem',
      top: '-30rem',
    },
  },
  '& .Img4': {
    rotate: '5deg',
    left: '10rem',
    top: '-55rem',
    [theme.breakpoints.up('md')]: {
      left: '60rem',
      top: '-45rem',
    },
  },
}));

const GridItemContainerThree = styled(GridItemContainerTwo)(({ theme }) => ({
  '& .Img1': {
    rotate: '30deg',
    left: '-2rem',
    top: '-50rem',
    [theme.breakpoints.up('md')]: {
      left: '-10rem',
      top: '25rem',
    },
  },
  '& .Img2': {
    rotate: '45deg',
    right: '-20rem',
    top: '-65rem',
    [theme.breakpoints.up('sm')]: {
      right: '-30rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '12rem',
      top: '5rem',
    },
  },
  '& p': {
    textAlign: 'left',
    position: 'relative',
    top: '-64rem',
    left: '-5rem',
    [theme.breakpoints.up('sm')]: {
      left: '-25rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '-15rem',
      top: '12rem',
    },
  },
  '& .Img3': {
    rotate: '-45deg',
    left: '-5rem',
    top: '-64rem',
    [theme.breakpoints.up('md')]: {
      left: '0rem',
      top: '12rem',
    },
  },
  '& .Img4': {
    rotate: '-30deg',
    left: '10rem',
    top: '-82rem',
    [theme.breakpoints.up('sm')]: {
      left: '20rem',
    },
    [theme.breakpoints.up('md')]: {
      left: '10rem',
      top: '-12rem',
    },
  },
}));

const Img = styled('img')(({ theme }) => ({
  position: 'absolute',
  borderRadius: 30,
  width: '20%',
  top: '30%',
  left: '40%',
  [theme.breakpoints.up('lg')]: {
    width: '22%',
    top: '16%',
  },
}));

const BlackRibbon = styled('div')(({ theme }) => ({
  '& .skewed': {
    backgroundColor: 'black',
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'center',
    backgroundSize: '14%',
    padding: '1.5rem',
    position: 'relative',
    bottom: '12rem',
    transform: 'skewY(-4deg)',
    transformOrigin: 'top left',
    [theme.breakpoints.up('sm')]: {
      backgroundSize: '9%',
      bottom: '11.3rem',
    },
    '@media (min-width: 800px)': {
      bottom: '10.9rem',
    },
    [theme.breakpoints.up('md')]: {
      bottom: '10.6rem',
    },
    '@media (min-width: 1000px)': {
      bottom: '10.2rem',
    },
    '@media (min-width: 1100px)': {
      bottom: '9.8rem',
    },
    [theme.breakpoints.up('lg')]: {
      backgroundSize: '6.7%',
      bottom: '9.2rem',
    },
  },
  '&::before': {
    content: '""',
    display: 'block',
    paddingTop: '10rem',
    background: 'white',
  },
  '&::after': {
    content: '""',
    display: 'block',
    paddingBottom: '15rem',
    background: 'orange',
    position: 'relative',
    bottom: '14rem',
    transform: 'skewY(-4deg)',
  },
}));

const Thumbnails = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <>
      <StyledGrid container spacing={2}>
        {matches && <Img src={Img1} className='Img1' />}
        <GridItem item xs={matches ? 4 : 12}>
          <GridItemContainerOne>
            <p>Just dress and walk</p>
            <div className='ImagesContainer'>
              <img src={Img1} className='Img1' />
              <img src={Img2} className='Img2' />
              <img src={Img3} className='Img3' />
              <img src={Img4} className='Img4' />
            </div>
          </GridItemContainerOne>
        </GridItem>
        <GridItem item xs={matches ? 4 : 12}>
          <GridItemContainerTwo>
            <div className='ImagesContainer'>
              <img src={Img1} className='Img1' />
              <img src={Img2} className='Img2' />
            </div>
            <p>
              With all the best
              <br />
              for any mood.
            </p>
            <div className='ImagesContainer'>
              <img src={Img3} className='Img3' />
              <img src={Img4} className='Img4' />
            </div>
          </GridItemContainerTwo>
        </GridItem>
        <GridItem item xs={matches ? 4 : 12}>
          <GridItemContainerThree>
            <div className='ImagesContainer'>
              <img src={Img1} className='Img1' />
              <img src={Img2} className='Img2' />
            </div>
            <p>
              With all the love for any
              <br />
              dynamic lifestyle!
            </p>
            <div className='ImagesContainer'>
              <img src={Img3} className='Img3' />
              <img src={Img4} className='Img4' />
            </div>
          </GridItemContainerThree>
        </GridItem>
      </StyledGrid>
      <BlackRibbon>
        <div className='skewed'></div>
      </BlackRibbon>
    </>
  );
};

export default Thumbnails;
