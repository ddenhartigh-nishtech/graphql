import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./index.js";
import * as dotenv from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// moved this to ./data/
// our in memory "db", may wire this into mssql or pg later
// const users = [
// 	{ id: "0", name: "Jean Luc Picard", age: 74, isMarried: false },
// 	{ id: "1", name: "William Ryker", age: 60, isMarried: true },
// 	{ id: "2", name: "Deanna Troi", age: 57, isMarried: true },
// ];

// exported this to ../schemas/user.gql & imported it at the top from typeDefs.js
// const typeDefs = gql`
// 	type Query {
// 		getUsers: [User]
// 		getUserById(id: ID!): User
// 	}

// 	type Mutation {
// 		createUser(name: String!, age: Int!, isMarried: Boolean!): User
// 		# modifyUser(user: User!)
// 		# deleteUserById(id: ID!)
// 	}

// 	type User {
// 		id: ID
// 		name: String
// 		age: Int
// 		isMarried: Boolean
// 	}
// `;
// note: for id, use type ID not string
// numbers types are Int or float
// note for larger APIs it would make sense to define these queries, mutations, and types in files elsewhere, import, and inject them into this main typeDefs
// can comment w/in the typeDefs - you may needGraphQL extension to see that it is indeed commented out, added gql to template literal to clue in intellisense
// the alternative to gql`` is to have seperate .graphql or .gql files, e.g. schema.gql and import it

// const resolvers = {
// 	Query: {
// 		getUsers: () => {
// 			return users;
// 			// here's where I would call db to get all my users
// 		},
// 		// parent: allows you to access parent, in this case Query
// 		// args: allows you to access the arguments passed to the method
// 		getUserById: (parent, args) => {
// 			const id = args.id;
// 			return users.find((u) => u.id === id);
// 			// here's where you would query from the db, SELECT ___ FROM ___ WHERE id = ID
// 		},
// 	},
// 	Mutation: {
// 		createUser: () => {
// 			const nextId = (
// 				Math.max(...users.map((u) => Number(u.id))) + 1
// 			).toString();
// 			const { name, age, isMarried } = args;
// 			const newUser = {
// 				id: nextId,
// 				name,
// 				age,
// 				isMarried,
// 			};
// 			users.push(newUser);
// 		},
// 	},
// };

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const port = parseInt(process.env.PORT || "4000", 10);

const server = new ApolloServer({ resolvers, typeDefs });

const { url } = await startStandaloneServer(server, {
	listen: { port },
});

console.log(`Server running @ ${url}`);
