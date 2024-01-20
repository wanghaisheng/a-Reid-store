import ReactLenis from '@studio-freight/react-lenis';

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
