import { motion } from 'framer-motion';
import StyledButton from '../../../components/Buttons/StyledButton';

type StyledNavButtonProps = {
  children: string | React.ReactNode;
  zIndex: number;
  x: number;
  rotate: number;
};

const StyledNavButton = ({ children, zIndex, x = 0, rotate }: StyledNavButtonProps) => {
  return (
    <StyledButton
      sx={{
        width: 150,
        color: 'white',
        fontSize: '1.7rem !important',
        fontWeight: 'normal',
        zIndex: zIndex,
        '&:hover': { color: 'primary.main', bgcolor: 'white' },
      }}
      variant='contained'
      component={motion.button}
      initial={{
        x: x,
        rotate: rotate,
        backgroundImage: 'linear-gradient(120deg, #b598d2 0%, #c4addb 100%)',
      }}
      whileHover={{
        rotate: 0,
        backgroundImage: 'linear-gradient(0deg, #fff 100%, #fff 100%)',
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </StyledButton>
  );
};

export default StyledNavButton;
