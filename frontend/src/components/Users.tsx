import { useEffect, useState } from "react";

import fetchGraphQL from "../service/users.service";
import type { User } from "../model/user";
import useDebounce from "../hooks/useDebounce";

const GET_USERS = `
  query GetUsers($name: String) {
    users(name: $name) {
      id
      name
      age
      address {
        street
        city
        country
      }
    }
  }
`;

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchName, setSearchName] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce(searchName, 300);
  useEffect(() => {
    fetchGraphQL(GET_USERS, {}).then((data) => setUsers(data.users));
  }, []);

  useEffect(() => {
    fetchGraphQL(GET_USERS, { name: debouncedValue }).then((data) => setUsers(data.users));
  }, [debouncedValue]);

  return (
    <>
      <h1>Users list</h1>

      <input
        type="text"
        placeholder="Search user name"
        onChange={(e) => setSearchName(e.target.value)}
      />

      <ul className="userList">
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {users.length === 0 && <p>No users found!</p>}
    </>
  );
}
