import { Theme, useMediaQuery } from '@mui/material';
import BlackRibbon from './BlackRibbon';
import {
  GridItemContainerOne,
  GridItemContainerThree,
  GridItemContainerTwo,
} from './GridItemContainer';
import { GridItem, Img, StyledGrid } from './Grid';

const Thumbnails = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <>
      <StyledGrid container spacing={2}>
        {matches && <Img src='/assets/home/mainHero.jpeg' className='Img1' />}
        <GridItem item xs={matches ? 4 : 12}>
          <GridItemContainerOne />
        </GridItem>
        <GridItem item xs={matches ? 4 : 12}>
          <GridItemContainerTwo />
        </GridItem>
        <GridItem item xs={matches ? 4 : 12}>
          <GridItemContainerThree />
        </GridItem>
      </StyledGrid>
      <BlackRibbon />
    </>
  );
};

export default Thumbnails;
