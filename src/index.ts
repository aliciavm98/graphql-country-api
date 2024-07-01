import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/CountryResolver";
import { AppDataSource } from "./data-source";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";

async function startServer() {
  // Initialisation de la source de données
  await AppDataSource.initialize();

  // Création du schéma GraphQL
  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  // Création d'une instance du serveur Apollo
  const server = new ApolloServer({
    schema,
  });

  // Initialisation de l'application Express
  const app = express();

  // Configuration du middleware JSON
  app.use(bodyParser.json());

  // Démarrage du serveur Apollo
  await server.start();

  // Configuration du middleware Apollo Server avec Express
  app.use("/graphql", expressMiddleware(server));

  // Démarrage de l'application Express sur le port 4000
  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
}

// Démarrage du serveur
startServer().catch((err) => {
  console.error("Error during server initialization:", err);
});
