import { Container, Typography } from '@mui/material';
import { ArrowIcon, BottomText, StyledHeadLine, TopText } from './StyledHeadLine';

const Headline = () => {
  return (
    <Container maxWidth='md'>
      <StyledHeadLine>
        <TopText>
          <Typography variant='h2'>We Make</Typography>
          <Typography variant='h2'>Your Style</Typography>
        </TopText>
        <BottomText>
          <ArrowIcon />
          <Typography variant='h1'>Elegant.</Typography>
        </BottomText>
      </StyledHeadLine>
    </Container>
  );
};

export default Headline;
