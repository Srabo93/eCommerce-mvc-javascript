import { ProductDTO } from "@adapters/anti-corruption-layer/ProductsMapper.ts";

export interface ForHandlingProducts {
  create(product: Omit<ProductDTO, "id">): void;
  save(product: ProductDTO): Promise<void>;
  all(): Promise<ProductDTO[]>;
  top(limit?: number): Promise<ProductDTO[]>;
}
