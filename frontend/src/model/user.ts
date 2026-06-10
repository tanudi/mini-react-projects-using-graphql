export interface User {
    name: string;
    age: number;
    id: string;
    address: Address;
}

export interface Address {
    street: string;
    country: string;
    city: string;
}