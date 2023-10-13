import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders the app", () => {
  render(<App />);
  const header = screen.getByRole("banner");
  expect(header).toHaveTextContent("Pokedex");
});

test("initial page should be empty", () => {
  render(<App />);
  const search = screen.getByPlaceholderText("Search by name or id");
  const section = screen.getByText(
    "To get started, search for your favorite Pokemon!"
  );

  expect(search).toBeInTheDocument();

  expect(section).toBeInTheDocument();
});
