import { ProductDTO } from "./dto.ts";

export interface ForHandlingProducts {
  createProduct(request: unknown): Promise<void>;
  findAllProducts(limit?: number): Promise<ProductDTO[]>;
  findTopProducts(limit?: number): Promise<ProductDTO[]>;
}
