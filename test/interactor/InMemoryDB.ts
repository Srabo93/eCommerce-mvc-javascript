import { ForPersistingProducts } from "@application/outbound/ForPersistingProducts.ts";
import { ForPersistingUsers } from "@application/outbound/ForPersistingUser.ts";
import { Product } from "@application/Product.ts";
import { ProductRecord } from "@application/anti-corruption-layer/ProductsMapper.ts";
import {
  UserRecord,
  UserDTO,
  UsersMapper,
} from "@application/anti-corruption-layer/UsersMapper.ts";

export class InMemoryDB implements ForPersistingProducts, ForPersistingUsers {
  constructor(
    private _products: ProductRecord[] = [],
    private _users: any[] = [],
  ) {
    for (let i = 0; i <= 10; i++) {
      const product = {
        productId: i,
        title: `Product ${i}`,
        description: `Description ${i}`,
        price: 20 + i,
        image: `randomimageurl${1}`,
        rating: i,
        categoryId: i,
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
  allProducts(): Promise<ProductRecord[]> {
    return new Promise((resolve, _reject) => {
      const result = this._products.map((product) => product);
      resolve(result);
    });
  }

  findUserByEmail(email: string): Promise<UserRecord | undefined> {
    const userFound = this._users.find(
      (userRecord) => userRecord.email === email,
    );
    return new Promise((resolve, _reject) => {
      resolve(userFound);
    });
  }

  registerUser(newUser: Omit<UserDTO, "id">): void {
    this._users.push(UsersMapper.toPersistence({ id: 303, ...newUser }));
  }
}
