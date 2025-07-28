import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { useState } from "react";

// copy/pasted from the gui on http://localhost:4000/
const GET_USERS = gql`
	query GetUsers {
		getUsers {
			# id
			name
			# age
			isMarried
			# note that I'm not requesting all the data, e.g. age and id are not asked for, and with the gql string literal, my comment key combo uses the correct comment symbol #
		}
	}
`;

const GET_USER_BY_ID = gql`
	query GetUserById($id: ID!) {
		getUserById(id: $id) {
			id
			name
			age
			isMarried
		}
	}
`;

const CREATE_USER = gql`
	mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
		createUser(name: $name, age: $age, isMarried: $isMarried) {
			id
			name
		}
	}
`;

function App() {
	const [newUser, setNewUser] = useState({
		name: "",
		age: "",
		isMarried: false,
	});
	// const [createUser] = useMutation(CREATE_USER);
	// more advanced createUser that uses caching to ensure the new user renders w/o having to re-run the GET_USERS query - could cause false positives
	// this is faster, but could result in false positives if the db operation failed
	const [createUser] = useMutation(CREATE_USER, {
		update(cache, { data: { createUser } }) {
			const existingUsers = cache.readQuery({ query: GET_USERS });

			cache.writeQuery({
				query: GET_USERS,
				data: {
					getUsers: [...existingUsers.getUsers, createUser],
				},
			});
		},
	});

	const {
		data: getUsersData,
		error: getUsersError,
		loading: getUsersLoading,
	} = useQuery(GET_USERS);

	const {
		data: getUserByIdData,
		error: getUserByIdError,
		loading: getUserByIdLoading,
	} = useQuery(GET_USER_BY_ID, {
		variables: { id: 0 },
	});

	const handleCreateUser = () => {
		console.log("newUser", newUser);
		const variables = {
			name: newUser.name,
			age: Number(newUser.age),
			isMarried: newUser.isMarried,
		};
		createUser({ variables });
		// createUser({ variables, refetchQueries: [{ query: GET_USERS }] }); // retriggers GET_USERS on submit to pull in new data, alt is to change createUser definition
	};

	if (getUsersLoading || getUserByIdLoading) {
		return <p>Loading data...</p>;
	}

	if (getUsersError || getUserByIdError) {
		return (
			<>
				{getUsersError && (
					<p>
						OH NO! something went wrong getting the users!
						<br />
						{getUsersError.message}
					</p>
				)}
				{getUserByIdError && (
					<p>
						OH NO! something went wrong getting the user!
						<br />
						{getUserByIdError.message}
					</p>
				)}
			</>
		);
	}

	return (
		<>
			<h1>Create a User</h1>
			<div>
				<input
					placeholder="Name..."
					value={newUser.name}
					onChange={(e) =>
						setNewUser((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
				/>
				<input
					placeholder="Age..."
					value={newUser.age}
					type="number"
					onChange={(e) =>
						setNewUser((prev) => ({
							...prev,
							age: e.target.value,
						}))
					}
				/>
				<input
					placeholder="Married?"
					type="checkbox"
					checked={newUser.isMarried}
					onChange={(e) =>
						setNewUser((prev) => ({
							...prev,
							isMarried: e.target.checked,
						}))
					}
				/>
				<button onClick={handleCreateUser}>Create User</button>
			</div>

			{getUsersData && (
				<>
					<h1>Users</h1>
					<div>
						{getUsersData.getUsers.map((u, key) => (
							<div key={`users-${key}`}>
								<br />
								{u.id && <p>ID: {u.id}</p>}
								{u.name && <p>Name: {u.name}</p>}
								{u.age && <p>Age: {u.age}</p>}
								{u.isMarried !== null && (
									<p>
										Marital Status:{" "}
										{u.isMarried ? "Married" : "Single"}
									</p>
								)}
							</div>
						))}
					</div>
				</>
			)}

			{getUserByIdData && (
				<>
					<h1>User</h1>
					<div>
						<p>ID: {getUserByIdData.getUserById.id}</p>
						<p>Name: {getUserByIdData.getUserById.name}</p>
						<p>Age: {getUserByIdData.getUserById.age}</p>
						<p>
							Marital Status:{" "}
							{getUserByIdData.getUserById.isMarried
								? "Married"
								: "Single"}
						</p>
					</div>
				</>
			)}
		</>
	);
}

export default App;
