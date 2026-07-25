import { render, screen } from "@testing-library/react";
import DealsTable from "./DealsTable";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Fetch } from "./fetch";

test("loads and displays dashboard heading", async () => {
  // ARRANGE
  render(<Fetch url="/" />);

  // ACT
  await screen.findByRole("heading");

  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("Deal Portfolio");
});
