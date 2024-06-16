import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';
import { Button, IconButton, Theme, useMediaQuery } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { motion, stagger, useAnimate } from 'framer-motion';
import StyledIconButton from '../../../components/Buttons/StyledIconButton';
import ProductCard from './ProductCard';
import SliderFooter from './SliderFooter';
import StyledSlider from './StyledSlider';
import { CategoryEntityResponse, ProductEntity } from '../../../gql/graphql';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useAsideDrawer } from '../../../hooks/useAsideDrawer';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { useTranslation } from 'react-i18next';

type ProductSliderProps = {
  productsData: {
    category: CategoryEntityResponse;
  };
};

const ProductsSlider = ({ productsData }: ProductSliderProps) => {
  const sliderRef = useRef<Slider>(null!);
  const nextRef = useRef<HTMLButtonElement>(null!);
  const prevRef = useRef<HTMLButtonElement>(null!);
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();
  const { activeUser } = useAuth();
  const { cartProducts, handleCart, wishlistProducts, handleWishlist } = useAsideDrawer();
  const { getLatestStoredValue: getLatestStoredCartValue, setValue } =
    useSessionStorage('cartProducts');
  const { t } = useTranslation();

  const handleSlickGoTo = (e: React.MouseEvent<HTMLElement>) => {
    const index = (e.target as HTMLElement).closest('.slick-slide')?.getAttribute('data-index');
    sliderRef.current.slickGoTo(+index!, true);
  };

  const handleSlickNext = () => {
    if (!nextRef.current.classList.contains('Circle')) {
      nextRef.current.classList.add('Circle');
      prevRef.current.classList.remove('Circle');
    }
    sliderRef.current.slickNext();
    handleAnimate();
  };

  const handleSlickPrev = () => {
    if (!prevRef.current.classList.contains('Circle')) {
      prevRef.current.classList.add('Circle');
      nextRef.current.classList.remove('Circle');
    }
    sliderRef.current.slickPrev();
    handleAnimate();
  };

  const handleAnimate = async () => {
    if (matches) {
      await animate('.product-card', { scale: 0.9 });
      await animate('.product-card', { scale: 1.1 });
      await animate('.product-card', { scale: 1 }, { delay: stagger(0.0025) });
    }
  };

  const navigateToProductPage = () => {
    const productId = document.querySelector(
      '.slick-active.slick-center.slick-current .product-card'
    )?.id;
    navigate(`/products/${productId}`);
  };

  const handleCartProduct = async () => {
    const productId = document.querySelector(
      '.slick-active.slick-center.slick-current .product-card'
    )?.id;
    const product = productsData.category.data?.attributes?.products?.data.find(
      (p) => p.id == productId
    );
    if (activeUser) {
      const createCartProduct = {
        data: {
          users_permissions_user: activeUser?.user.id,
          productId,
          name: product!.attributes!.name,
          size: product!.attributes!.size!,
          color: product!.attributes!.color!,
          cartCounter: 1,
          img: product!.attributes!.img,
          price: product!.attributes!.price,
        },
      };
      const isCartProduct = cartProducts?.find(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        (e: ProductEntity) => e.attributes?.productId == productId
      );
      if (!isCartProduct) await handleCart('CREATE', createCartProduct);
      const isWishlistProduct = wishlistProducts?.find((e: ProductEntity) => e.id == productId);
      if (isWishlistProduct) handleWishlist(false, product!);
    } else {
      const isCartProduct = getLatestStoredCartValue('cartProducts').data?.find(
        (e: ProductEntity) => e.id == productId
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (!isCartProduct) setValue(product!);
    }
  };

  const settings = {
    dots: matches ? true : false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    accessibility: true,
    centerMode: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div ref={scope}>
      <StyledSlider ref={sliderRef} {...settings}>
        {productsData.category.data!.attributes!.products!.data.map((product: ProductEntity) => (
          <ProductCard key={product.id} product={product} onGoTo={handleSlickGoTo} />
        ))}
      </StyledSlider>
      <SliderFooter className='SliderFooter'>
        <div className='ProductDetailsButtons'>
          <StyledIconButton
            className='ProductBagBtn'
            component={motion.button}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCartProduct()}
          >
            <LocalMallOutlinedIcon sx={{ fontSize: '1.8rem' }} />
          </StyledIconButton>
          <Button
            className='ProductDetailsBtn'
            component={motion.button}
            whileTap={{ scale: 0.95 }}
            onClick={navigateToProductPage}
          >
            {t('ProductDetails')}
          </Button>
        </div>
        <div className='SlideButtons'>
          <IconButton ref={prevRef} className='ArrowBtn Circle' onClick={handleSlickPrev}>
            <WestIcon />
          </IconButton>
          <IconButton ref={nextRef} className='ArrowBtn' onClick={handleSlickNext}>
            <EastIcon />
          </IconButton>
        </div>
      </SliderFooter>
    </div>
  );
};

export default ProductsSlider;
