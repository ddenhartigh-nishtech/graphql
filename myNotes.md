# [Full Stack GraphQL React Tutorial - Apollo Client / Apollo Server](https://www.youtube.com/watch?v=BNYwj0ZvU1U)

## Project Structure

-   **client**

    -   Frontend (FE) portion of the project

-   **server**
    -   Backend (BE) portion of the project

## Setup

### Misc

-   I've elaborated on this tutorial a bit in an attempt to use some best practices by separating out different pieces into their own directories and then importing these into an `index.js` and ultimately `server.js`.
-   While for a small demo this doesn’t seem super necessary, if this were a real project that would grow, this kind of organization becomes increasingly helpful.

### On `server`:

```bash
npm i --yes && npm pkg set type="module"
npm i @apollo/server graphql
npm install @graphql-tools/load-files @graphql-tools/merge
```

-   Did a plethora of my own tweaks to abstract our / import a lot of what was on server.js

### On `client`:

```bash
npx create-vite
.
react
javasript (maybe I can convert it to ts later)
npm i
npm run dev (to preview that its working)
```

-   gutted client\src\App.jsx

```bash
new terminal (still running the app)
npm i @apollo/client graphql
```

-   wrap <App /> from client\src\main.jsx w/ ApolloClient, InMemoryCache, ApolloProvider
-   wrote code for App.jsx to getUsers and display their data
-   wrote code for App.jsx to getUserById and display that data
-   refactored the code to be a bit drier
-   adding the form and function call to add a new user to my users data
-   refactored it a bit so that the view updates on user creation
-   made the inputs model newUser
