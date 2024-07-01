import { DataSource } from "typeorm";
import { Country } from "./entities/Country";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "countries.sqlite",
  synchronize: true,
  logging: false,
  entities: [Country],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
