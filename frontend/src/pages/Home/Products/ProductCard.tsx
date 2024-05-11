import { useAnimate } from 'framer-motion';
import { Card, CardImg, CardStatus, CardText } from './StyledProductCard';
import { ProductEntity } from '../../../gql/graphql';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

type ProductCardProps = {
  product: ProductEntity;
  onGoTo: (e: React.MouseEvent<HTMLElement>) => void;
};

const ProductCard = ({ product, onGoTo }: ProductCardProps) => {
  const [scope, animate] = useAnimate();
  const { t } = useTranslation();

  const handleAnimate = async (e: React.MouseEvent<HTMLElement>) => {
    await animate('.product-card', { scale: 0.9 });
    await animate('.product-card', { scale: 1 });
    onGoTo(e);
  };

  return (
    <motion.div
      ref={scope}
      onClick={handleAnimate}
      initial={{
        opacity: 0,
        scale: 0,
        rotateY: 180,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transformOrigin: 'center',
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Card className='product-card' id={product.id!}>
        <CardImg src={product.attributes?.img} />
        <CardText className='CardText'>
          <h4>
            {product.attributes!.name.length > 20
              ? product.attributes?.name.substring(0, 20) + '...'
              : product.attributes?.name}
          </h4>
          <p>$ {product.attributes?.price}</p>
        </CardText>
        <CardStatus>{t('new')}</CardStatus>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
