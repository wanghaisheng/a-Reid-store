import { styled } from '@mui/material';
import CSS from 'csstype';

const Container = styled('div')({
  padding: '8rem 0',
  minHeight: '100vh',
  borderBottomLeftRadius: '40px',
  borderBottomRightRadius: '40px',
  borderBottom: `2px solid white`,

  '& .pageWrapper': { width: '90%', maxWidth: '1200px', margin: '0 auto' },
});

type PageContainerProps = {
  children: React.ReactNode;
  style?: CSS.Properties;
};

const PageContainer = ({ children, style }: PageContainerProps) => {
  return (
    <Container style={style}>
      <div className='pageWrapper'>{children}</div>
    </Container>
  );
};

export default PageContainer;
