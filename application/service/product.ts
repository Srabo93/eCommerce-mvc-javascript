import {
  CreateProductDTO,
  ProductRecord,
  PublicProductDTO,
  ProductsMapper,
} from "../anti-corruption-layer/ProductsMapper.ts";
import { ForHandlingProducts } from "../inbound/product/ForHandlingProducts.ts";
import { ForPersistingProducts } from "../outbound/ForPersistingProducts.ts";
import { Product } from "../Product.ts";

export class ProductService implements ForHandlingProducts {
  constructor(private readonly repository: ForPersistingProducts) {}

  async create(dto: CreateProductDTO): Promise<void> {
    const newProduct = Product.create({
      categoryId: dto.categoryId,
      title: dto.title,
      description: dto.description,
      price: dto.price,
      image: dto.image,
      rating: dto.rating,
    });

    await this.repository.createProduct(newProduct);
  }

  save(product: ProductRecord): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async all(): Promise<PublicProductDTO[]> {
    const products = await this.repository.allProducts();

    return products.map((record) => ProductsMapper.toPublicDTO(record));
  }
  async top(limit?: number): Promise<PublicProductDTO[]> {
    const products = await this.repository.topProducts(limit);

    return products.map((record) => ProductsMapper.toPublicDTO(record));
  }
}
