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
