import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./index.js";
import * as dotenv from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const port = parseInt(process.env.PORT || "4000", 10);

const server = new ApolloServer({ resolvers, typeDefs });

const { url } = await startStandaloneServer(server, {
	listen: { port },
});

console.log(`Server running @ ${url}`);
