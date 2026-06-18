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

/**
 * Represents a product in the catalogue.
 *  - category : groups products (e.g. "Electronics", "Clothing")
 *  - price    : stored as a float (e.g. 29.99)
 *  - name     : human-readable product label
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}
