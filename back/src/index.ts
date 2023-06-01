import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import dataSource from "./utils";
import { WilderResolver } from "./resolver/wilderResolver";
import { SkillResolver } from "./resolver/skillResolver";


async function main(): Promise<void> {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver]
  });

  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log("Server has started!");
}

void main();
