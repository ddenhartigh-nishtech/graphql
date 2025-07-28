import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:4000/", // how to set this up to reference .env, could be pointing to a hosted solution as well - wherever is serving your applicatoin
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</StrictMode>
);
