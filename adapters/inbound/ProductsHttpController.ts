import { GetTopProducts } from "@application/inbound/product/GetTopProducts.ts";
import { ForPersistingProducts } from "@application/outbound/ForPersistingProducts.ts";
import { GetProducts } from "@application/inbound/product/GetProducts.ts";

export class ProductsHttpController implements GetTopProducts, GetProducts {
  constructor(private db: ForPersistingProducts) {}

  allProducts() {
    return this.db.findAllProducts();
  }

  topProducts(limit?: number) {
    return this.db.findTopProducts(limit);
  }
}
