import { Theme, useMediaQuery } from '@mui/material';
import BlackRibbon from './BlackRibbon';
import {
  GridItemContainerOne,
  GridItemContainerThree,
  GridItemContainerTwo,
} from './GridItemContainer';
import { GridItem, Img, StyledGrid } from './Grid';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const Thumbnails = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  // Track mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  //Transform values based on mouse position
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [-15, 15]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  const scale = useTransform(mouseX, [0, window.innerWidth], [1, 1.2]);

  return (
    <>
      <StyledGrid
        container
        spacing={2}
        component={motion.div}
        onMouseMove={(event) => {
          mouseX.set(event.clientX);
          mouseY.set(event.clientY);
        }}
        initial={{
          opacity: 0,
          y: '25rem',
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {matches && (
          <Img
            src='/assets/home/mainHero.jpeg'
            className='Img1'
            style={{ rotateX, rotateY, scale }}
          />
        )}
        <GridItem
          item
          xs={matches ? 4 : 12}
          component={motion.div}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          style={{ rotateX, rotateY, scale }}
        >
          <GridItemContainerOne />
        </GridItem>
        <GridItem
          item
          xs={matches ? 4 : 12}
          component={motion.div}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          style={{ rotateX, rotateY, scale }}
        >
          <GridItemContainerTwo />
        </GridItem>
        <GridItem
          item
          xs={matches ? 4 : 12}
          component={motion.div}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          style={{ rotateX, rotateY, scale }}
        >
          <GridItemContainerThree />
        </GridItem>
      </StyledGrid>
      <BlackRibbon />
    </>
  );
};

export default Thumbnails;
