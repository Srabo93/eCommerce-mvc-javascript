import { Product } from "../../Product.ts";
import { ProductRecord } from "../../service/product/ProductDTO.ts";

export interface ForHandlingProducts {
  createProduct(product: Product): Promise<void>;
  findAllProducts(limit?: number): Promise<ProductRecord[]>;
  findTopProducts(limit?: number): Promise<ProductRecord[]>;
}
