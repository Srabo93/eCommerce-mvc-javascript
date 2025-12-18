import { ForPersistingProducts } from "@application/outbound/ForPersistingProducts.ts";
import { InMemoryDB } from "./test/interactor/InMemoryDB.ts";
import { load } from "jsr:@std/dotenv";
import { PostgreSQLRepository } from "@adapters/outbound/PostgreSQLRepository.ts";
import { ForPersistingUsers } from "@application/outbound/ForPersistingUser.ts";

export interface AppContext {
  database: ForPersistingProducts & ForPersistingUsers;
}

const env = await load({
  envPath: ".env",
  export: true,
});

export function createContext(): AppContext {
  switch (env.APP_ENV) {
    case "development": {
      const database = new InMemoryDB();
      return { database };
    }

    case "integration": {
      const database = new PostgreSQLRepository();
      return { database };
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
