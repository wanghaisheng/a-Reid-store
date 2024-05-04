import { styled } from '@mui/material';

export const Card = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  maxHeight: '370px',
  overflow: 'hidden',
});

export const CardImg = styled('img')({
  width: '100%',
  maxHeight: '300px',
  borderRadius: '20px',
  filter: 'blur(1.5px) opacity(50%)',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
});

export const CardText = styled('div')(({ theme }) => ({
  '& h4': {
    marginBottom: 0,
  },
  '& p': {
    marginTop: 0,
    color: theme.palette.gray.dark,
    fontSize: '1.5rem',
  },
}));

export const CardStatus = styled('div')(({ theme }) => ({
  padding: '0rem 1rem',
  borderRadius: '2rem',
  background: theme.palette.secondary.main,
  color: 'black',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  position: 'absolute',
  top: '1.5rem',
  left: '1.5rem',
}));
