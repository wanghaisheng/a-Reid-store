import { Theme, useMediaQuery } from '@mui/material';
import BlackRibbon from './BlackRibbon';
import {
  GridItemContainerOne,
  GridItemContainerThree,
  GridItemContainerTwo,
} from './GridItemContainer';
import { GridItem, Img, StyledGrid } from './Grid';
import Img1 from '../../../assets/pexels-photo-8928928.jpeg';

const Thumbnails = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <>
      <StyledGrid container spacing={2}>
        {matches && <Img src={Img1} className='Img1' />}
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
