import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from '@mui/material';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Parser } from 'html-to-react';
import testimonials, { Testimonial } from './_data';

const StyledSlider = styled('div')({
  maxWidth: '475px',
  maxHeight: '350px',
  '& .slick-arrow': { display: 'none !important' },
});

const SliderCard = styled('div')(({ theme }) => ({
  padding: '4rem',
  marginBottom: '0.5rem',
  display: 'flex !important',
  justifyContent: 'space-between',
  background: theme.palette.secondary.main,
  borderRadius: 40,
  position: 'relative',

  '&.whiteCard': {
    background: 'white',

    '& .arrowIcon': {
      color: theme.palette.secondary.main,
    },

    '& .quoteIcon': {
      color: theme.palette.gray.main,
    },

    '& .brandName': {
      color: theme.palette.primary.main,
    },
  },

  '& .arrowIcon': {
    transform: 'rotateX(-180deg)',
    fontSize: '3.5rem',
    color: 'white',
    marginTop: '2%',
  },

  '& .quoteIcon': {
    fontSize: '10rem',
    color: theme.palette.secondary.dark,
    position: 'absolute',
    left: '75%',
    top: '6%',
  },
}));

const CardContent = styled('div')(({ theme }) => ({
  margin: '0 2rem',
  width: '100%',

  '& .header': {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    '& img': { width: 50, height: 50, borderRadius: '100%' },
    '& h3, p': { fontSize: '2rem', lineHeight: 0 },
    '& p': { color: theme.palette.gray.dark, fontSize: '1.4rem' },
  },

  '& .body': {
    fontSize: '2.2rem',
    margin: '4rem 0',
    '& .brandName': {
      fontWeight: 'bold',
      fontSize: '2.2rem',
      margin: '0.2rem',
    },
  },
}));

const TestimonialsSlider = () => {
  const { parse } = new Parser();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    vertical: true,
  };

  return (
    <StyledSlider>
      <Slider {...settings}>
        {testimonials.map((testimonial: Testimonial, index: number) => (
          <SliderCard key={testimonial.id} className={index % 2 == 0 ? 'whiteCard' : ''}>
            <ShortcutIcon className='arrowIcon' />
            <CardContent>
              <div className='header'>
                <img src={testimonial.img} />
                <div className='header-title'>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.title}</p>
                </div>
              </div>
              <p className='body'>{parse(testimonial.comment)}</p>
            </CardContent>
            <FormatQuoteIcon className='quoteIcon' />
          </SliderCard>
        ))}
      </Slider>
    </StyledSlider>
  );
};

export default TestimonialsSlider;
