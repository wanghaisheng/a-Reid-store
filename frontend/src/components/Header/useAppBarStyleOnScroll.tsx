import { Theme, useMediaQuery, useTheme } from '@mui/material';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

const useAppBarStyleOnScroll = () => {
  const matchBugFix = useMediaQuery((theme: Theme) => theme.breakpoints.down(720));
  const { scrollYProgress } = useScroll();
  const [isDownScroll, setIsDownScroll] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const theme = useTheme();

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const previous = scrollYProgress.getPrevious();
    setScrollPosition(latest);
    if (
      latest > previous &&
      latest > +theme.mixins.toolbar.minHeight! / window.innerHeight &&
      scrollY > 0 // in case of page reload, or navigating to another page through the browser's SearchBar
    ) {
      setIsDownScroll(true);
    }
    if (latest == 0 || latest <= +theme.mixins.toolbar.minHeight! / window.innerHeight) {
      setIsDownScroll(false);
    }
  });

  const appBarStyleOnScroll = {
    backdropFilter: scrollPosition > 0 ? 'blur(6px)' : 'none',
    backgroundColor: scrollPosition > 0 ? 'rgba(165, 129, 199, 0.5)' : 'default',
    width: !matchBugFix && isDownScroll ? '90%' : '100%',
    m: !matchBugFix && isDownScroll ? '0 5% 0  5%' : 0,
    borderBottomLeftRadius: isDownScroll ? 25 : 0,
    borderBottomRightRadius: isDownScroll ? 25 : 0,
    transition: 'all 0.3s ease-in-out',
  };

  return { appBarStyleOnScroll, scrollPosition };
};

export default useAppBarStyleOnScroll;
