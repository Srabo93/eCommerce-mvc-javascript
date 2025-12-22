import * as z from "zod";
import {
  ProductDTO,
  ProductRecord,
  PublicProductDTO,
} from "@application/service/product/ProductDTO.ts";

export const ProductSchema = z
  .object({
    title: z.string().min(2),
    description: z.string().min(2),
    price: z.number().positive(),
    image: z.string().min(2),
    rating: z.number().min(0),
    categoryId: z.number().int().positive(),
  })
  .strict() satisfies z.ZodType<ProductDTO>;

export const ProductRecordSchema = z
  .object({
    productId: z.number().int().positive(),
    categoryId: z.number().int().positive(),
    title: z.string().min(2),
    description: z.string().min(2),
    price: z.number().positive(),
    image: z.string().min(2),
    rating: z.number().min(0),
  })
  .strict() satisfies z.ZodType<ProductRecord>;

export const PublicProductDTOSchema = z
  .object({
    productId: z.number().int().positive(),
    categoryId: z.number().int().positive(),
    title: z.string().min(2),
    description: z.string().min(2),
    price: z.number().positive(),
    image: z.string().min(2),
    rating: z.number().min(0),
  })
  .strict() satisfies z.ZodType<PublicProductDTO>;
