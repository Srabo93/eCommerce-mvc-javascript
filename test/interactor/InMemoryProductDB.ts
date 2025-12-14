import { ForPersistingProducts } from "@application/outbound/ForPersistingProducts.ts";
import { Product, ProductDTO } from "@application/Product.ts";

export class InMemoryProductDB implements ForPersistingProducts {
  constructor(private _products: Product[] = []) {
    for (let i = 0; i <= 10; i++) {
      const product = Product.create({
        title: `Product ${i}`,
        description: `Description ${i}`,
        price: 20 + i,
        image: `randomimageurl${1}`,
        rating: i,
      });
      this._products.push(product);
    }
  }

  save(): void {
    throw new Error("Method not implemented.");
  }

  findAllProducts(): Promise<ProductDTO[]> {
    return new Promise((resolve, _reject) => {
      const result = this._products.map((product) => product.properties);
      resolve(result);
    });
  }

  findTopProducts(limit?: number): Promise<ProductDTO[]> {
    return new Promise((resolve, _reject) => {
      const result = this._products
        .filter((product) => product.price > 5)
        .map((product) => product.properties)
        .slice(0, limit);
      resolve(result);
    });
  }
}
