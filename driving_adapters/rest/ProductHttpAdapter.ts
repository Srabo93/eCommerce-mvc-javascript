import {
  ProductSchema,
  PublicProductDTO,
} from "@application/anti-corruption-layer/ProductsMapper.ts";
import { ProductService } from "@application/service/ProductService.ts";

export class ProductHttpAdapter {
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
    return products;
  }

  async topProducts(limit?: number): Promise<PublicProductDTO[]> {
    const products = await this.productService.findTopProducts(limit);
    return products;
  }
}
