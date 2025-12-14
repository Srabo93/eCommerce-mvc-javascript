import { ProductDTO } from "../Product.ts";

export interface ForPersistingProducts {
  save(): void;
  findTopProducts(limit?: number): Promise<ProductDTO[]>;
  findAllProducts(): Promise<ProductDTO[]>;
}
