import { load } from "jsr:@std/dotenv";
import { ProductService } from "@application/service/ProductService.ts";
import { PostgreSQLRepository } from "./driven_adapters/postgresqlRepository/PostgreSQLRepository.ts";
import { InMemoryDB } from "./test/interactor/InMemoryDB.ts";
import { ProductHttpAdapter } from "./driving_adapters/rest/ProductHttpAdapter.ts";
import { UserService } from "@application/service/UserService.ts";
import { UserHttpAdapter } from "./driving_adapters/rest/UserHttpAdapter.ts";

const env = await load({
  envPath: ".env",
  export: true,
});

export function createContext() {
  switch (env.APP_ENV) {
    case "development": {
      const database = new InMemoryDB();
      const productService = new ProductService(database);
      const userService = new UserService(database);
      const usersController = new UserHttpAdapter(userService);
      const productController = new ProductHttpAdapter(productService);
      return { productController };
    }

    case "integration": {
      const database = new PostgreSQLRepository();
      const productService = new ProductService(database);
      const productController = new ProductHttpAdapter(productService);
      return { productController };
    }

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
