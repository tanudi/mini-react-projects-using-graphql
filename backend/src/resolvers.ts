/**
 * Resolvers
 * ---------
 * Resolvers are the *implementation* of the schema. For every field defined
 * in the schema there can be a resolver function that tells GraphQL how to
 * fetch or compute its value.
 *
 * Structure mirrors the schema:
 *   resolvers.Query.users  →  handles the `users` query field
 *
 * How the `users` resolver works:
 *   1. It receives the optional `name` argument from the client query.
 *   2. If `name` is absent  → returns all users.
 *   3. If `name` is present → filters the in-memory list with a
 *      case-insensitive partial match (includes).
 *
 * Resolver function signature (GraphQL standard):
 *   (parent, args, context, info) => value
 *    │       │      │        └─ metadata about the query (rarely needed)
 *    │       │      └────────── shared context (auth tokens, DB connections)
 *    │       └───────────────── arguments passed by the client
 *    └───────────────────────── value returned by the parent resolver
 *                               (for root Query fields, parent is undefined)
 */

import { users } from "./data";

export const resolvers = {
  Query: {
    /**
     * Fetches users with optional name search.
     * @param _parent - unused for root queries
     * @param args.name - optional search string
     */
    users: (_parent: unknown, args: { name?: string }) => {
      if (!args.name) {
        // No filter — return full list
        return users;
      }

      // Case-insensitive partial match on the name field
      const search = args.name.toLowerCase();
      return users.filter((user) => user.name.toLowerCase().includes(search));
    },
  },
};
