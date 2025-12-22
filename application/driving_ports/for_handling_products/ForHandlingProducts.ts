import { PublicProductDTO } from "../../anti-corruption-layer/ProductsMapper.ts";
import { Product } from "../../Product.ts";

export interface ForHandlingProducts {
  createProduct(product: Product): Promise<void>;
  findAllProducts(limit?: number): Promise<PublicProductDTO[]>;
  findTopProducts(limit?: number): Promise<PublicProductDTO[]>;
}
