import { PublicProductDTO } from "../../anti-corruption-layer/ProductsMapper.ts";
import { Product } from "../../Product.ts";

export interface ForHandlingProducts {
  create(product: Product): Promise<void>;
  all(): Promise<PublicProductDTO[]>;
  top(limit?: number): Promise<PublicProductDTO[]>;
}
