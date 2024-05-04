import { ThreeDots } from 'react-loader-spinner';

export const Spinner = ({ place }: { place?: string }) => {
  let height = 90;
  if (place == 'productsSlider') height = 50;
  if (place == 'productsPage') height = 60;

  return (
    <ThreeDots
      visible={true}
      height='80'
      width='80'
      color='#ffda55'
      ariaLabel='rings-loading'
      wrapperStyle={{
        height: `${height}vh`,
        width: '50vw',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      wrapperClass='homeLoader'
    />
  );
};
