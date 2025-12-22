import { load } from "jsr:@std/dotenv";
import { ProductService } from "@application/service/product/ProductService.ts";
import { InMemoryProductsDB } from "@driven_adapters/in_memory/InMemoryProductsDB.ts";
import { ProductApiAdapter } from "@driving_adapters/product_api/ProductApiAdapter.ts";

const env = await load({
  envPath: ".env",
  export: true,
});

export function createContext() {
  switch (env.APP_ENV) {
    case "development": {
      const inMemoryProductDB = new InMemoryProductsDB();
      const productService = new ProductService(inMemoryProductDB);
      const productApiAdapter = new ProductApiAdapter(productService);
      return { productApiAdapter };
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
