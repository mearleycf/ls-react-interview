import { render, screen } from "@testing-library/react";
import DealsTable from "./DealsTable";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("loads and displays dashboard heading", async () => {
  // ARRANGE

  // ACT
  await screen.findByRole("heading");

  // ASSERT
  // note--bad test, we are rendering deal table but asserting deal portfolio exists...and only after rendering the root route, generically...
  expect(screen.getByRole("heading")).toHaveTextContent("Deal Portfolio");
});
