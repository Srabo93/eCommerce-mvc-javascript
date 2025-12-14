import { ProductDTO } from "../../Product.ts";

export interface GetProducts {
  allProducts(): Promise<ProductDTO[]>;
}
