export type ProductDTO = {
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  categoryId: number;
};

export type ProductRecord = {
  productId: number;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
};

export type PublicProductDTO = {
  productId: number;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
};
