import { ForHandlingProducts } from "@application/inbound/product/ForHandlingProducts.ts";
import { ProductService } from "@application/service/product.ts";
import {
  CreateProductDTO,
  PublicProductDTO,
} from "@application/anti-corruption-layer/ProductsMapper.ts";

export class ProductsHttpController implements ForHandlingProducts {
  constructor(private readonly productService: ProductService) {}

  async create(dto: CreateProductDTO): Promise<void> {
    await this.productService.create({
      categoryId: dto.categoryId,
      title: dto.title,
      description: dto.description,
      price: dto.price,
      image: dto.image,
      rating: dto.rating,
    });
  }

  async all(): Promise<PublicProductDTO[]> {
    const products = await this.productService.all();
    return products;
  }

  async top(limit?: number): Promise<PublicProductDTO[]> {
    const products = await this.productService.top(limit);
    return products;
  }
}
