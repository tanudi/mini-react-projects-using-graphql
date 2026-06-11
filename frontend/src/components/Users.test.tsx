import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Users from "./Users";

describe("UsersComponent", () => {
  beforeEach(() => {
    // jsdom doesn't ship with fetch, so we define it as a jest.fn() directly.
    // jest.fn() returns jest.Mock which has mockResolvedValue built in.
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ data: { users: [{ id: "a1", name: "dummy", age: 25, address: {} }] } }),
      ok: true,
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders the Users list heading", () => {
    render(<Users />);
    expect(screen.getByRole("heading", { name: "Users list" })).toBeInTheDocument();
  });

  test("renders all the users", async () => {
    render(<Users />);
    const listitem = await screen.findAllByRole("listitem");
    expect(listitem).toHaveLength(1);
  });

  test("render searched user", async () => {
    render(<Users />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "d");
    expect(input).toHaveValue("d");
  });

  test("filters the list after typing a search name", async () => {
    jest.useFakeTimers();

    // The component fires 2 fetch calls on mount:
    //   call 1 — effect with [] dep (initial load)
    //   call 2 — effect with [debouncedValue] dep, fires immediately because
    //             useDebounce initialises debouncedValue to "" via useState
    // Both return 2 users so we can confirm the list shrinks after search.
    // Call 3 (after the debounce fires) falls back to the beforeEach default
    // which returns only the "dummy" user — simulating a filtered response.
    (globalThis.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => ({
          data: {
            users: [
              { id: "a1", name: "dummy", age: 25, address: {} },
              { id: "a2", name: "other", age: 30, address: {} },
            ],
          },
        }),
        ok: true,
      })
      .mockResolvedValueOnce({
        json: async () => ({
          data: {
            users: [
              { id: "a1", name: "dummy", age: 25, address: {} },
              { id: "a2", name: "other", age: 30, address: {} },
            ],
          },
        }),
        ok: true,
      });

    render(<Users />);

    // Flush mount effects: advances useDebounce's initial timer and resolves
    // all pending fetch promises so the 2-user list is painted.
    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    // Simulate typing — fireEvent updates the input value in one shot,
    // which triggers useDebounce to schedule a 300ms setTimeout.
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "dummy" } });

    // Advance past the debounce delay so debouncedValue becomes "dummy",
    // triggering the search effect and the 3rd fetch call.
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    // List should now show only the matching user
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("dummy")).toBeInTheDocument();

    jest.useRealTimers();
  });
});
