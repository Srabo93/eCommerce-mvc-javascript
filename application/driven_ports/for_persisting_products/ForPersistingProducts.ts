import { Product } from "../../Product.ts";
import { ProductRecord } from "../../service/product/ProductDTO.ts";

export interface ForPersistingProducts {
  createProduct(product: Product): Promise<void>;
  saveProduct(product: ProductRecord): Promise<void>;
  topProducts(limit?: number): Promise<ProductRecord[]>;
  allProducts(limit?: number): Promise<ProductRecord[]>;
}
