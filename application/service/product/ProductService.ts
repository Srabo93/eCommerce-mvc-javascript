import { ForPersistingProducts } from "../../driven_ports/for_persisting_products/ForPersistingProducts.ts";
import { ForHandlingProducts } from "../../driving_ports/for_handling_products/ForHandlingProducts.ts";
import { Product } from "../../Product.ts";
import { ProductDTO, ProductRecord } from "./ProductDTO.ts";

export class ProductService implements ForHandlingProducts {
  constructor(private readonly repository: ForPersistingProducts) {}

  async createProduct(dto: ProductDTO): Promise<void> {
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

  async findAllProducts(limit?: number): Promise<ProductRecord[]> {
    const products = await this.repository.allProducts(limit);
    return products;
  }

  async findTopProducts(limit?: number): Promise<ProductRecord[]> {
    const products = await this.repository.topProducts(limit);
    return products;
  }
}
