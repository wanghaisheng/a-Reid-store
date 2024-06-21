import { styled } from '@mui/material';

const StyledContactPage = styled('div')(({ theme }) => ({
  '& .contact': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `2px solid white`,
    borderRadius: '20px',
    marginBottom: '8rem',
    padding: '2rem',
    gap: '4rem',
    [theme.breakpoints.up('sm')]: {
      padding: '4rem',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  },

  '& .formContainer': {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },

    '& form': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3rem',
      width: '100%',
      padding: '0 2rem',
      [theme.breakpoints.up('lg')]: {
        padding: '0 6rem',
      },

      '& .MuiFormLabel-root': {
        color: 'white',
      },

      '.MuiInputBase-input:focus': {
        '& fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: 'red !important',
        },
      },

      '& fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },

      '& .submitBtn': {
        color: 'black',
        background: theme.palette.secondary.main,
        width: '100%',
        padding: '1rem 0',
        '&:hover': {
          background: theme.palette.secondary.light,
        },
      },
    },
  },

  '& .contactInfo': {
    width: '100%',
    color: 'white',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },

    '& .title': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      gap: '2rem',
    },

    '& .text': {
      marginLeft: '4.5rem',
      maxWidth: '250px',
    },
  },

  '& .map': {
    '& iframe': {
      width: '100%',
      height: '425px',
      border: `4px solid white`,
      borderRadius: '20px',
    },

    '& .mapBtn': {
      display: 'block',
      textAlign: 'center',
      marginTop: '2rem',

      '& button': {
        color: 'black',
        background: theme.palette.secondary.main,
        '&:hover': {
          background: theme.palette.secondary.light,
        },
      },
    },
  },
}));

export default StyledContactPage;
