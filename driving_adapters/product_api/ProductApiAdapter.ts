import { ForPersistingProducts } from "@application/driven_ports/for_persisting_products/ForPersistingProducts.ts";
import { ForHandlingProducts } from "@application/driving_ports/for_handling_products/ForHandlingProducts.ts";
import { Product } from "@application/Product.ts";
import { NewProductSchema } from "./ProductSchema.ts";
import { ProductDTO } from "@application/driving_ports/for_handling_products/dto.ts";

export class ProductApiAdapter implements ForHandlingProducts {
  constructor(private readonly repository: ForPersistingProducts) {}

  async createProduct(request: unknown): Promise<void> {
    const parsed = NewProductSchema.safeParse(request);

    if (!parsed.success) {
      throw parsed.error;
    }
    const { data } = parsed;

    const newProduct = Product.create({
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.image,
      rating: data.rating,
    });

    await this.repository.createProduct(newProduct);
  }

  async findAllProducts(limit?: number): Promise<ProductDTO[]> {
    return (await this.repository.allProducts(limit)).map((record) => {
      return {
        productId: record.productId,
        categoryId: record.categoryId,
        title: record.title,
        description: record.description,
        price: record.price,
        rating: record.rating,
        image: record.image,
      } satisfies ProductDTO;
    });
  }

  async findTopProducts(limit?: number): Promise<ProductDTO[]> {
    return (await this.repository.topProducts(limit)).map((record) => {
      return {
        productId: record.productId,
        categoryId: record.categoryId,
        title: record.title,
        description: record.description,
        price: record.price,
        rating: record.rating,
        image: record.image,
      } satisfies ProductDTO;
    });
  }
}
