import { Modal, styled } from '@mui/material';
import ProductCartDetails from './ProductCartDetails';
import ProductGalleryBox from './ProductGalleryBox';
import CloseIcon from '@mui/icons-material/Close';

const ModalContainer = styled('div')(({ theme }) => ({
  background: 'white',
  width: '95%',
  borderTopLeftRadius: '2rem',
  borderBottomLeftRadius: '2rem',
  padding: '4rem',
  overflow: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6rem',
  [theme.breakpoints.up('md')]: {
    width: '75%',
    maxHeight: '90vh',
    overflow: 'clip',
    borderRadius: '2rem',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '2rem',
  },
}));

type ProductViewProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductView = ({ open, setOpen }: ProductViewProps) => {
  const handleCloseModal = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      disableScrollLock={true}
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .modalHeader': {
          width: '95%',
          textAlign: 'right',
          cursor: 'pointer',
          [theme.breakpoints.up('md')]: {
            width: '75%',
          },
        },
      })}
    >
      <>
        <div className='modalHeader' onClick={handleCloseModal}>
          <CloseIcon sx={{ color: 'gray.main' }} />
        </div>
        <ModalContainer>
          <ProductGalleryBox />
          {<ProductCartDetails />}
        </ModalContainer>
      </>
    </Modal>
  );
};

export default ProductView;
