import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typesArray = loadFilesSync(`${__dirname}/schemas/**/*.gql`);
export const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(`${__dirname}/resolvers/**/*.js`);
export const resolvers = mergeResolvers(resolversArray);
