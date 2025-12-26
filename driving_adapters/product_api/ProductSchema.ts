import * as z from "zod";
import { ProductRecord } from "@application/driven_ports/for_persisting_products/dto.ts";
import {
  NewProductDTO,
  ProductDTO,
} from "@application/driving_ports/for_handling_products/dto.ts";

export const NewProductSchema = z
  .object({
    categoryId: z.number().int().positive(),
    title: z.string().min(2),
    description: z.string().min(2),
    price: z.number().positive(),
    image: z.string().min(2),
    rating: z.number().min(0),
  })
  .strict() satisfies z.ZodType<NewProductDTO>;

export const ProductSchema = z
  .object({
    productId: z.number().int().positive(),
    categoryId: z.number().int().positive(),
    title: z.string().min(2),
    description: z.string().min(2),
    price: z.number().positive(),
    image: z.string().min(2),
    rating: z.number().min(0),
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
