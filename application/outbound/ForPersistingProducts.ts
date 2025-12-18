import {
  ProductDTO,
  ProductRecord,
} from "@adapters/anti-corruption-layer/ProductsMapper.ts";

export interface ForPersistingProducts {
  createProduct(product: Omit<ProductDTO, "id">): Promise<void>;
  saveProduct(product: ProductRecord): Promise<void>;
  topProducts(limit?: number): Promise<ProductRecord[]>;
  allProducts(): Promise<ProductRecord[]>;
}
