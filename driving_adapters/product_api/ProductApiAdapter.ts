import { PublicProductDTO } from "@application/service/product/ProductDTO.ts";
import { ProductService } from "@application/service/product/ProductService.ts";
import { ProductMapper } from "./ProductMapper.ts";
import { ProductSchema } from "./ProductSchema.ts";

export class ProductApiAdapter {
  constructor(private readonly productService: ProductService) {}

  async create(request: unknown): Promise<void> {
    const parsed = ProductSchema.safeParse(request);

    if (!parsed.success) {
      throw parsed.error;
    }
    const { data } = parsed;

    await this.productService.createProduct({
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.image,
      rating: data.rating,
    });
  }

  async allProducts(limit?: number): Promise<PublicProductDTO[]> {
    const products = await this.productService.findAllProducts(limit);

    return products.map((record) => ProductMapper.toPublicDTO(record));
  }

  async topProducts(limit?: number): Promise<PublicProductDTO[]> {
    const products = await this.productService.findTopProducts(limit);

    return products.map((record) => ProductMapper.toPublicDTO(record));
  }
}
