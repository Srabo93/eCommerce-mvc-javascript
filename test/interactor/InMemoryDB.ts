import { ForPersistingProducts } from "@application/outbound/ForPersistingProducts.ts";
import {
  ProductDTO,
  ProductRecord,
  ProductsMapper,
} from "@adapters/anti-corruption-layer/ProductsMapper.ts";
import { ForPersistingUsers } from "@application/outbound/ForPersistingUser.ts";
import {
  UserDTO,
  UserRecord,
  UsersMapper,
} from "@adapters/anti-corruption-layer/UsersMapper.ts";

export class InMemoryDB implements ForPersistingProducts, ForPersistingUsers {
  constructor(
    private _products: ProductRecord[] = [],
    private _users: UserRecord[] = [],
  ) {
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
  createProduct(product: Omit<ProductDTO, "id">): Promise<void> {
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
}
