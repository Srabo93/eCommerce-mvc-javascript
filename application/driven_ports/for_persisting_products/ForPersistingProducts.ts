import { ProductRecord } from "../../anti-corruption-layer/ProductsMapper.ts";
import { Product } from "../../Product.ts";

export interface ForPersistingProducts {
  createProduct(product: Product): Promise<void>;
  saveProduct(product: ProductRecord): Promise<void>;
  topProducts(limit?: number): Promise<ProductRecord[]>;
  allProducts(): Promise<ProductRecord[]>;
}
