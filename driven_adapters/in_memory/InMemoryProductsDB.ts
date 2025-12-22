import { ForPersistingProducts } from "@application/driven_ports/for_persisting_products/ForPersistingProducts.ts";
import { Product } from "@application/Product.ts";
import { ProductRecord } from "@application/service/product/ProductDTO.ts";

export class InMemoryProductsDB implements ForPersistingProducts {
  constructor(private _products: ProductRecord[] = []) {
    for (let i = 0; i <= 10; i++) {
      const product = {
        productId: i + 12,
        title: `Product ${i}`,
        description: `Description ${i}`,
        price: 20 + i,
        image: `randomimageurl${1}`,
        rating: i,
        categoryId: i + 45,
      } satisfies ProductRecord;

      this._products.push(product);
    }
  }

  createProduct(product: Product): Promise<void> {
    return new Promise((resolve, _reject) => {
      const newRecord = {
        productId: 23,
        categoryId: product.categoryId,
        title: product.title,
        price: product.price,
        description: product.description,
        rating: product.rating,
        image: product.image,
      } satisfies ProductRecord;
      this._products.push(newRecord);
      resolve();
    });
  }

  saveProduct(product: ProductRecord): Promise<void> {
    return new Promise((resolve, _reject) => {
      this._products.push(product);
      resolve();
    });
  }

  topProducts(limit?: number): Promise<ProductRecord[]> {
    return new Promise((resolve, _reject) => {
      const result = this._products
        .filter((product) => product.price > 5)
        .map((product) => product)
        .slice(0, limit);
      resolve(result);
    });
  }

  allProducts(limit?: number): Promise<ProductRecord[]> {
    return new Promise((resolve, _reject) => {
      const result = this._products.map((product) => product).slice(0, limit);
      resolve(result);
    });
  }
}
