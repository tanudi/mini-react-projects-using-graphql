/**
 * TypeScript types that mirror the GraphQL schema.
 * Keeping them in sync ensures type safety throughout the backend.
 */

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  age: number;
  address: Address;
}
