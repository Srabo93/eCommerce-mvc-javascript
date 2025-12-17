import {
  ProductDTO,
  ProductRecord,
} from "@adapters/anti-corruption-layer/ProductsMapper.ts";

export interface ForPersistingProducts {
  create(product: Omit<ProductDTO, "id">): Promise<void>;
  save(product: ProductRecord): Promise<void>;
  findTopProducts(limit?: number): Promise<ProductRecord[]>;
  findAllProducts(): Promise<ProductRecord[]>;
}
