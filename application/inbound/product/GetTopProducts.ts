import { ProductDTO } from "../../Product.ts";

export interface GetTopProducts {
  topProducts(limit?: number): Promise<ProductDTO[]>;
}
