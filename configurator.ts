import { ForPersistingProducts } from "@application/outbound/ForPersistingProducts.ts";
import { InMemoryProductDB } from "./test/interactor/InMemoryProductDB.ts";
import { load } from "jsr:@std/dotenv";

export interface AppContext {
  productRepo: ForPersistingProducts;
}

const env = await load({
  envPath: ".env",
  export: true,
});

export function createContext(): AppContext {
  switch (env.APP_ENV) {
    case "development": {
      const productRepo = new InMemoryProductDB();
      return { productRepo };
    }
    //
    // case "integration": {
    //
    // }
    //
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
