import { Grid, Theme, styled, useMediaQuery } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { quotes } from './_data';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocaleContext } from '../../../contexts/locale/LocaleContext';

const GridItem = styled('div')(({ theme }) => ({
  background: 'white',
  width: '80%',
  margin: '0 auto',
  height: '400px',
  borderRadius: 35,
  overflow: 'hidden',
  position: 'relative',
  '@media (min-width: 480px)': {
    width: '70%',
    height: '420px',
  },
  '@media (min-width: 600px)': {
    width: '100%',
  },

  '&:hover': {
    '& .content': {
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '& .footer': { opacity: 0 },
  },

  '& img': {
    position: 'absolute',
    width: '100%',
    height: '325px',
    borderRadius: 35,
    '@media (min-width: 480px)': {
      height: '345px',
    },
  },

  '& .footer': {
    position: 'absolute',
    bottom: 0,
    fontSize: '1.8rem',
    fontWeight: 'bold',
    height: '75px',
    margin: 0,
    width: '100%',
    textAlign: 'center',
    lineHeight: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease-in-out 0s',
  },

  '& .content': {
    position: 'absolute',
    background: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 35,
    textAlign: 'center',
    top: '100%',
    transition: 'top 0.3s ease-in-out 0s',
    '& .title': { fontSize: '1.8rem', fontWeight: 'bold' },
    '& .quote': { padding: '2rem' },
    '& .quoteIcon': {
      fontSize: '2.5rem',
      color: theme.palette.secondary.main,
      transform: 'rotate(180deg)',
    },
    '& .saidBy': {
      background: theme.palette.secondary.main,
      padding: '0.2rem 1rem',
      display: 'inline-block',
      margin: '2rem 0',
    },
  },
}));

const Cards = () => {
  const matchesXS = useMediaQuery((theme: Theme) => theme.breakpoints.up(0));
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.up(600));
  const matchesMD = useMediaQuery((theme: Theme) => theme.breakpoints.up(900));
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);

  let cols: number;
  if (matchesXS) cols = 12;
  if (matchesSM) cols = 6;
  if (matchesMD) cols = 3;

  return (
    <Grid container spacing={2}>
      {quotes.map((q) => (
        <Grid item xs={cols} key={q.id}>
          <GridItem>
            <img src={q.img} />
            <div className='content'>
              <p className='title'>{t(`${q.title}`)}</p>
              <div className='quote'>
                <p>
                  <FormatQuoteIcon className='quoteIcon' />
                  {lang == 'ar' ? q.quote2 : q.quote}
                  <br /> <span className='saidBy'>{q.saidBy}</span>
                </p>
              </div>
            </div>
            <p className='footer'>{t(`${q.title}`)}</p>
          </GridItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
