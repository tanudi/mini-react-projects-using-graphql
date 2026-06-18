/**
 * In-memory mock data acting as our "database".
 * In a real app this would be replaced by a DB query (e.g. Postgres, MongoDB).
 */

import { User, Product } from "./types";

export const users: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    age: 28,
    address: { street: "12 Maple St", city: "New York", country: "USA" },
  },
  {
    id: "2",
    name: "Bob Smith",
    age: 34,
    address: { street: "45 Oak Ave", city: "Los Angeles", country: "USA" },
  },
  {
    id: "3",
    name: "Carol White",
    age: 22,
    address: { street: "7 Pine Rd", city: "London", country: "UK" },
  },
  {
    id: "4",
    name: "David Brown",
    age: 45,
    address: { street: "88 Cedar Blvd", city: "Toronto", country: "Canada" },
  },
  {
    id: "5",
    name: "Eva Martinez",
    age: 31,
    address: { street: "33 Elm St", city: "Madrid", country: "Spain" },
  },
];

/**
 * Mock product catalogue.
 * Each entry matches the Product interface and the GraphQL Product type.
 * Prices are in USD.
 */
export const products: Product[] = [
  { id: "1", name: "Wireless Headphones", category: "Electronics", price: 79.99 },
  { id: "2", name: "Running Shoes",       category: "Footwear",    price: 59.99 },
  { id: "3", name: "Coffee Maker",        category: "Appliances",  price: 49.99 },
  { id: "4", name: "Yoga Mat",            category: "Sports",      price: 24.99 },
  { id: "5", name: "Desk Lamp",           category: "Furniture",   price: 34.99 },
];
