import { ForPersistingProducts } from "@application/outbound/ForPersistingProducts.ts";
import { ForHandlingProducts } from "@application/inbound/product/ForHandlingProducts.ts";
import {
  ProductDTO,
  ProductsMapper,
} from "../anti-corruption-layer/ProductsMapper.ts";

export class ProductsHttpController implements ForHandlingProducts {
  constructor(private db: ForPersistingProducts) {}

  save(product: ProductDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async allProducts(): Promise<ProductDTO[]> {
    const allProducts = await this.db.findAllProducts();

    return allProducts.map((productRecord) => {
      return ProductsMapper.toDTO(productRecord);
    });
  }

  async topProducts(limit?: number): Promise<ProductDTO[]> {
    const topProductsRecord = await this.db.findTopProducts(limit);

    return topProductsRecord.map((topProduct) => {
      return ProductsMapper.toDTO(topProduct);
    });
  }

  create(product: Omit<ProductDTO, "id">): void {
    this.db.create(product);
  }
}
