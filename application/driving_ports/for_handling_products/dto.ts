export type ProductDTO = {
  productId: number;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
};

export type NewProductDTO = {
  categoryId: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
};
