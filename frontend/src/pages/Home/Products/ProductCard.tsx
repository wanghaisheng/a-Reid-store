import { useAnimate } from 'framer-motion';
import { Card, CardImg, CardStatus, CardText } from './StyledProductCard';
import { ProductEntity } from '../../../gql/graphql';

type ProductCardProps = {
  product: ProductEntity;
  onGoTo: (e: React.MouseEvent<HTMLElement>) => void;
};

const ProductCard = ({ product, onGoTo }: ProductCardProps) => {
  const [scope, animate] = useAnimate();

  const handleAnimate = async (e: React.MouseEvent<HTMLElement>) => {
    await animate('.product-card', { scale: 0.9 });
    await animate('.product-card', { scale: 1 });
    onGoTo(e);
  };

  return (
    <div ref={scope} onClick={handleAnimate}>
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
        <CardStatus>new</CardStatus>
      </Card>
    </div>
  );
};

export default ProductCard;
