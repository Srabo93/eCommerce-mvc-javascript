import * as z from "zod";
import { Product } from "@application/Product.ts";

export const ProductSchema = z
  .object({
    title: z.string().min(2),
    description: z.string().min(2),
    price: z.number().positive(),
    image: z.string().min(2),
    rating: z.number().min(0),
    categoryId: z.number().int().positive(),
  })
  .strict();

export type ProductDTO = z.infer<typeof ProductSchema>;

export const ProductRecordSchema = z.object({
  productId: z.number().int().positive(),
  categoryId: z.number().int().positive(),
  title: z.string().min(2),
  description: z.string().min(2),
  price: z.number().positive(),
  image: z.string().min(2),
  rating: z.number().min(0),
});

export type ProductRecord = z.infer<typeof ProductRecordSchema>;

export const PublicProductDTOSchema = z.object({
  productId: z.number().int().positive(),
  categoryId: z.number().int().positive(),
  title: z.string().min(2),
  description: z.string().min(2),
  price: z.number().positive(),
  image: z.string().min(2),
  rating: z.number().min(0),
});

export type PublicProductDTO = z.infer<typeof PublicProductDTOSchema>;

export class ProductsMapper {
  static toEntity(record: ProductRecord): Product {
    const parsed = ProductRecordSchema.safeParse(record);

    if (!parsed.success) {
      throw parsed.error;
    }
    const { data } = parsed;

    return Product.create({
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.image,
      rating: data.rating,
    });
  }

  static toRecord(product: PublicProductDTO): ProductRecord {
    const parsed = PublicProductDTOSchema.safeParse(product);

    if (!parsed.success) {
      throw parsed.error;
    }

    return {
      productId: product.productId,
      categoryId: product.categoryId,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      rating: product.rating,
    };
  }

  static toPublicDTO(record: ProductRecord): PublicProductDTO {
    const parsed = ProductRecordSchema.safeParse(record);

    if (!parsed.success) {
      throw parsed.error;
    }

    return {
      productId: record.productId,
      categoryId: record.categoryId,
      title: record.title,
      description: record.description,
      price: record.price,
      image: record.image,
      rating: record.rating,
    };
  }
}
