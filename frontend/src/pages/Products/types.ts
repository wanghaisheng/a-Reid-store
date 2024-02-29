export type Product = {
  attributes: {
    product_id: number;
    name: string;
    desc: string;
    img: string;
    thumbs: string[];
    price: number;
    isLiked: boolean;
  };
};
