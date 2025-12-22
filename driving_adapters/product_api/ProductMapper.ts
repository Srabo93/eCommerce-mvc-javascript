import { Product } from "@application/Product.ts";
import {
  ProductRecord,
  PublicProductDTO,
} from "@application/service/product/ProductDTO.ts";
import { PublicProductDTOSchema } from "./ProductSchema.ts";

export class ProductMapper {
  static toEntity(dto: PublicProductDTO): Product {
    const parsed = PublicProductDTOSchema.safeParse(dto);

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

  // static toRecord(product: PublicProductDTO): ProductRecord {
  //   const parsed = ProductRecordSchema.safeParse(product);
  //
  //   if (!parsed.success) {
  //     throw parsed.error;
  //   }
  //
  //   return parsed.data;
  // }

  static toPublicDTO(record: ProductRecord): PublicProductDTO {
    const parsed = PublicProductDTOSchema.safeParse(record);

    if (!parsed.success) {
      throw parsed.error;
    }
    return parsed.data;
  }
}
