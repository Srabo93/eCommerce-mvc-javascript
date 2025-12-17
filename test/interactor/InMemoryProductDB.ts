import { ForPersistingProducts } from "@application/outbound/ForPersistingProducts.ts";
import {
  ProductDTO,
  ProductRecord,
  ProductsMapper,
} from "@adapters/anti-corruption-layer/ProductsMapper.ts";

export class InMemoryProductDB implements ForPersistingProducts {
  constructor(private _products: ProductRecord[] = []) {
    for (let i = 0; i <= 10; i++) {
      const product = ProductsMapper.toPersistence({
        id: i,
        title: `Product ${i}`,
        description: `Description ${i}`,
        price: 20 + i,
        image: `randomimageurl${1}`,
        rating: i,
        categoryId: i,
      } satisfies ProductDTO);

      this._products.push(product);
    }
  }
  create(product: Omit<ProductDTO, "id">): Promise<void> {
    return new Promise((resolve, _reject) => {
      const newRecord = {
        id: 55,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        rating: product.rating,
        category_id: product.categoryId,
      } satisfies ProductRecord;
      this._products.push(newRecord);
      resolve();
    });
  }
  save(product: ProductRecord): Promise<void> {
    return new Promise((resolve, _reject) => {
      this._products.push(product);
      resolve();
    });
  }
  findTopProducts(limit?: number): Promise<ProductRecord[]> {
    return new Promise((resolve, _reject) => {
      const result = this._products
        .filter((product) => product.price > 5)
        .map((product) => product)
        .slice(0, limit);
      resolve(result);
    });
  }
  findAllProducts(): Promise<ProductRecord[]> {
    return new Promise((resolve, _reject) => {
      const result = this._products.map((product) => product);
      resolve(result);
    });
  }
}
