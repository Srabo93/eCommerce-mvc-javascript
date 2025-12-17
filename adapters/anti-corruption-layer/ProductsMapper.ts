import { Product } from "@application/Product.ts";

export type ProductRecord = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category_id: number;
};

export type ProductDTO = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  categoryId: number;
};

export class ProductsMapper {
  static toDomain(record: ProductRecord): Product {
    return Product.create({
      title: record.title,
      description: record.description,
      price: record.price,
      image: record.image,
      rating: record.rating,
    });
  }

  static toPersistence(record: ProductDTO): ProductRecord {
    return {
      id: record.id,
      title: record.title,
      description: record.description,
      price: record.price,
      image: record.image,
      rating: record.rating,
      category_id: record.categoryId,
    };
  }

  static toDTO(record: ProductRecord): ProductDTO {
    return {
      id: record.id,
      title: record.title,
      description: record.description,
      price: record.price,
      image: record.image,
      rating: record.rating,
      categoryId: record.category_id,
    };
  }
}
