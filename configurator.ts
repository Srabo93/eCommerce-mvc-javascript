import { InMemoryDB } from "./test/interactor/InMemoryDB.ts";
import { load } from "jsr:@std/dotenv";
import { PostgreSQLRepository } from "@adapters/outbound/PostgreSQLRepository.ts";
import { ProductService } from "@application/service/product.ts";
import { ProductsHttpController } from "@adapters/inbound/ProductController.ts";
import { UsersHttpController } from "@adapters/inbound/UserController.ts";
import { UserService } from "@application/service/user.ts";

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
      const usersController = new UsersHttpController(userService);
      const productController = new ProductsHttpController(productService);
      return { productController };
    }

    case "integration": {
      const database = new PostgreSQLRepository();
      const productService = new ProductService(database);
      const productController = new ProductsHttpController(productService);
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
