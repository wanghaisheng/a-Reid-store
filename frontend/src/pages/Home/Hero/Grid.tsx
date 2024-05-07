import { Grid, styled } from '@mui/material';

export const StyledGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.mode == 'light' ? 'white' : '#2F1C40',
  overflow: 'hidden',
  height: '150vh',
  paddingTop: '5rem',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    height: 'calc(100vh + 15rem)',
    padding: '0 0 10rem',
  },
})) as typeof Grid;

export const GridItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}) as typeof Grid;

export const Img = styled('img')(({ theme }) => ({
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
