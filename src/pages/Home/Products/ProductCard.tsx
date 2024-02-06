import { useAnimate } from 'framer-motion';
import { Card, CardImg, CardStatus, CardText } from './StyledProductCard';

export type Product = {
  id: number;
  img: string;
  title: string;
  price: number;
  isNew: boolean;
  category: string;
};

type GoTo = {
  onGoTo: (e: React.MouseEvent<HTMLElement>) => void;
};

const ProductCard = (props: Product & GoTo) => {
  const { img, title, price, onGoTo, isNew } = props;
  const [scope, animate] = useAnimate();

  const handleAnimate = async (e: React.MouseEvent<HTMLElement>) => {
    await animate('.product-card', { scale: 0.9 });
    await animate('.product-card', { scale: 1 });
    onGoTo(e);
  };

  return (
    <div ref={scope} onClick={handleAnimate}>
      <Card className='product-card'>
        <CardImg src={img} />
        <CardText className='CardText'>
          <h4>{title}</h4>
          <p>$ {price}</p>
        </CardText>
        {isNew && <CardStatus>new</CardStatus>}
      </Card>
    </div>
  );
};

export default ProductCard;
