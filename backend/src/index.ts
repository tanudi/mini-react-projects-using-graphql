/**
 * Server Entry Point
 * ------------------
 * Wires everything together:
 *   - Creates an Apollo Server instance with our schema + resolvers
 *   - Starts an HTTP server (Apollo's built-in standalone server)
 *   - Exposes a single endpoint: POST /graphql
 *
 * Why Apollo Server?
 *   Apollo Server is the most popular GraphQL server for Node.js.
 *   It handles HTTP, parsing, validation, and execution automatically.
 *   The `startStandaloneServer` helper spins up a plain HTTP server so
 *   we don't need Express for this simple setup.
 *
 * How to make a request (using the GraphQL Playground or curl):
 *   POST http://localhost:4000/
 *   Content-Type: application/json
 *   Body: { "query": "{ users { id name age address { city } } }" }
 *
 *   With name search:
 *   Body: { "query": "{ users(name: \"ali\") { id name } }" }
 */

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const PORT = 4000;

async function startServer() {
  // 1. Create the Apollo Server — pass schema + resolvers
  const server = new ApolloServer({ typeDefs, resolvers });

  // 2. Start the HTTP server on the given port
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`GraphQL server running at: ${url}`);
  console.log(`Open ${url} in your browser to use the Apollo Sandbox.`);
}

startServer();
