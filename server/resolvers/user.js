import users from "../data/users.js";

const userResolvers = {
	Query: {
		getUsers: () => {
			return users;
			// here's where I would call db to get all my users
		},
		// parent: allows you to access parent, in this case Query
		// args: allows you to access the arguments passed to the method
		getUserById: (parent, args) => {
			const id = args.id;
			return users.find((u) => u.id === id);
			// here's where you would query from the db, SELECT ___ FROM ___ WHERE id = ID
		},
	},
	Mutation: {
		createUser: (parent, args) => {
			const nextId = (
				Math.max(...users.map((u) => Number(u.id))) + 1
			).toString();
			const { name, age, isMarried } = args;
			const newUser = {
				id: nextId,
				name,
				age,
				isMarried,
			};
			users.push(newUser);
		},
	},
};

export default userResolvers;
