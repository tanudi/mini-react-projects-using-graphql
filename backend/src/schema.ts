/**
 * GraphQL Schema (Type Definitions)
 * ---------------------------------
 * This file defines the "shape" of your API — what data exists and what
 * operations clients can perform. It is written in SDL (Schema Definition
 * Language), the standard way to describe a GraphQL API.
 *
 * Key concepts used here:
 *
 *  type Address   — a GraphQL object type. Every field is explicitly typed.
 *  type User      — another object type that *nests* Address inside it.
 *  type Query     — the special root type. Every read-only operation lives
 *                   here (analogous to REST GET endpoints).
 *  [User]         — a list of User objects.
 *  String         — a built-in scalar (GraphQL's primitive types).
 *  Int            — built-in scalar for integers.
 *  !              — non-null modifier. The field can never return null.
 *  users(name)    — a Query field with an *optional* argument.
 *                   If `name` is provided, results are filtered by it.
 *                   If omitted, all users are returned.
 */

import { gql } from "graphql-tag";

export const typeDefs = gql`
  # Represents a physical address.
  type Address {
    street: String!
    city: String!
    country: String!
  }

  # Represents a single user in the system.
  type User {
    id: ID!
    name: String!
    age: Int!
    address: Address!
  }

  # Root Query type — the entry point for all read operations.
  type Query {
    """
    Returns a list of users.
    Optionally filter by partial name match (case-insensitive).
    Example: users(name: "ali") returns Alice, Alibaba, etc.
    """
    users(name: String): [User!]!
  }
`;
