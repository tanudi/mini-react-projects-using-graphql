import Users from "./Users";
import { render, screen } from "@testing-library/react";

describe("UsersComponent", () => {
  test("expect users list", async () => {
    window.fetch = jest.fn(); // creates a mock function
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", name: "first row", age: 25 }], // simulating the http call
    });
    render(<Users />);

    const el = screen.getByText("Users List");
    expect(el).toBeInTheDocument();
  });
});
