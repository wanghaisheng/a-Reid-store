import { Modal, styled } from '@mui/material';
import ProductCartDetails from './ProductCartDetails.tsx';
import ProductGalleryBox from './ProductGalleryBox';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { closeModal } from '../../app/features/modalSlice';
import { productThumbs } from './_data.ts';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../graphql/queries.ts';
import { Maybe } from '../../gql/graphql.ts';

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

const ProductView = ({ modalItem }: { modalItem: Maybe<string> }) => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((store) => store.modal);
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: modalItem },
  });
  const thumbs = productThumbs.find((p) => p.id == modalItem)?.thumbs;

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (loading) return false;
  if (error) return <p>Error : {error.message}</p>;

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
          <ProductGalleryBox thumbs={thumbs!} img={data.product.data.attributes.img} />
          <ProductCartDetails id={data.product.data.id} />
        </ModalContainer>
      </>
    </Modal>
  );
};

export default ProductView;
