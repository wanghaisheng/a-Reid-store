import { Modal, styled } from '@mui/material';
import ProductCartDetails from './ProductCartDetails';
import ProductGalleryBox from './ProductGalleryBox';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { closeModal } from '../../app/features/modalSlice';
import { productThumbs } from './_data.ts';

export const ModalContainer = styled('div')(({ theme }) => ({
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

const ProductView = () => {
  const dispatch = useAppDispatch();
  const { open, modalItem: product } = useAppSelector((store) => store.modal);
  const thumbs = productThumbs.find((p) => p.id == product?.attributes.product_id)?.thumbs;

  const handleCloseModal = () => {
    dispatch(closeModal());
    document.body.style.overflow = 'unset';
  };

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
        <ModalContainer className='lenis lenis-smooth'>
          <ProductGalleryBox thumbs={thumbs!} img={product?.attributes.img} />
          <ProductCartDetails />
        </ModalContainer>
      </>
    </Modal>
  );
};

export default ProductView;
