import { load } from "jsr:@std/dotenv";
import { InMemoryProductsDB } from "@driven_adapters/in_memory/InMemoryProductsDB.ts";
import { ProductApiAdapter } from "@driving_adapters/product_api/ProductApiAdapter.ts";
import { UserApiAdapter } from "@driving_adapters/user_api/UserApiAdapter.ts";
import { InMemoryUsersDB } from "@driven_adapters/in_memory/InMemoryUsersDB.ts";

const env = await load({
  envPath: ".env",
  export: true,
});

export function createContext() {
  switch (env.APP_ENV) {
    case "development": {
      const inMemoryProductDB = new InMemoryProductsDB();
      const inMemoryUserDB = new InMemoryUsersDB();
      const productApiAdapter = new ProductApiAdapter(inMemoryProductDB);
      const userApiAdapter = new UserApiAdapter(inMemoryUserDB);
      return { productApiAdapter, userApiAdapter };
    }

    // case "integration": {
    //   const database = new PostgresProductRespository();
    //   const productService = new ProductService(database);
    //   const productApiAdapter = new ProductApiAdapter(productService);
    //   return { productApiAdapter };
    // }

    // case "prod": {
    //   const database = getDatabase("prod");
    //   migrate(database);
    //
    //   const userRepo = new UserRepository(database);
    //   const countryTaxRepo = new CountryTaxRepository(database);
    //
    //   return {
    //     userRepo,
    //     countryTaxRepo,
    //   };
    // }
    default:
      throw new Error(`Unknown APP_ENV: ${env}`);
  }
}
