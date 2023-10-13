import { configureStore } from "@reduxjs/toolkit";
import { setupServer } from "msw/node";
import { act, fireEvent, screen, within } from "@testing-library/react";
import { renderWithProviders } from "../tests/test-utils";
import { handlers } from "../tests/mocks/handlers";
import Cards from "./components/Card/Cards";
import Form from "./components/Form/Form";

import pokemonReducer from "./store/pokemon";

// This should be better but time is running short
Object.defineProperty(window, "scrollTo", { value: () => {}, writable: true });

const server = setupServer(...handlers);

const sleep = (time = 1) => new Promise((res) => setTimeout(res, time));

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const setup = () => {
  renderWithProviders(
    <>
      <Form />
      <Cards />
    </>,
    {
      store: configureStore({ reducer: { pokemons: pokemonReducer } }),
    }
  );
};

// Ideally these tests would be smaller and more focused
test("fetches pokemon & adds card to first spot", async () => {
  setup();

  const getSearch = () => screen.getByPlaceholderText("Search by name or id");
  const getButton = () => screen.getByRole("button", { name: "Search" });
  const getCards = () => screen.findAllByTestId("card");

  let search = getSearch();
  let button = getButton();
  expect(search).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  // Search for Pikachu
  fireEvent.change(search, { target: { value: "Pikachu" } });
  expect(search).toHaveValue("Pikachu");
  fireEvent.click(button);

  let cards = await getCards();
  expect(cards).toHaveLength(1);

  await screen.findByText("Pikachu", { selector: "h2" });
  search = getSearch();
  button = getButton();
  expect(search).toHaveValue("");

  // Search for Pichu
  fireEvent.change(search, { target: { value: "Pichu" } });
  expect(search).toHaveValue("Pichu");
  fireEvent.click(button);

  // Making sure the UI is updated since findBy will return once it find the preexisting card
  await act(async () => await sleep());

  cards = await getCards();
  expect(cards).toHaveLength(2);

  // Confirming that the newly added Pokemon is the first card
  expect(
    within(cards[0]).getByText("Pichu", { selector: "h2" })
  ).toBeInTheDocument();

  // Search for Raichu
  search = getSearch();
  button = getButton();
  fireEvent.change(search, { target: { value: "Raichu" } });
  expect(search).toHaveValue("Raichu");
  fireEvent.click(button);

  // Making sure the UI is updated since findBy will return once it find the preexisting card
  await act(async () => await sleep());

  cards = await getCards();
  expect(cards).toHaveLength(3);

  // Confirming that the newly added Pokemon is the first card
  expect(
    within(cards[0]).getByText("Raichu", { selector: "h2" })
  ).toBeInTheDocument();

  // Confirming that searching for a previously searched Pokemon will bring it back to the first position
  search = getSearch();
  button = getButton();
  fireEvent.change(search, { target: { value: "Pikachu" } });
  expect(search).toHaveValue("Pikachu");
  fireEvent.click(button);

  // Making sure the UI is updated since findBy will return once it find the preexisting card
  await act(async () => await sleep());

  cards = await getCards();
  expect(cards).toHaveLength(3);

  // Confirming that the newly added Pokemon is the first card
  expect(
    within(cards[0]).getByText("Pikachu", { selector: "h2" })
  ).toBeInTheDocument();
});

test("evolution links work as expected", async () => {
  setup();

  const getSearch = () => screen.getByPlaceholderText("Search by name or id");
  const getButton = () => screen.getByRole("button", { name: "Search" });
  const getCards = () => screen.findAllByTestId("card");

  let search = getSearch();
  let button = getButton();

  // Search for Pikachu
  fireEvent.change(search, { target: { value: "Pikachu" } });
  expect(search).toHaveValue("Pikachu");
  fireEvent.click(button);

  let cards = await getCards();
  expect(cards).toHaveLength(1);

  await screen.findByText("Pikachu", { selector: "h2" });
  let buttons = within(cards[0]).getAllByRole("button");
  let active = within(screen.getByTestId("evolution")).getByText("Pikachu", {
    selector: "span",
    exact: false,
  });
  expect(buttons).toHaveLength(2);
  expect(buttons[0]).toHaveTextContent("Pichu");
  expect(buttons[1]).toHaveTextContent("Raichu");
  expect(active).toBeInTheDocument();

  // Clicking on the Pichu button
  fireEvent.click(buttons[0]);

  await act(async () => await sleep());

  cards = await getCards();
  expect(cards).toHaveLength(2);

  let card = within(cards[0]);
  buttons = card.getAllByRole("button");
  let evolution = card.getByTestId("evolution");
  active = within(evolution).getByText("Pichu", {
    selector: "span",
    exact: false,
  });
  expect(buttons).toHaveLength(2);
  expect(buttons[0]).toHaveTextContent("Pikachu");
  expect(buttons[1]).toHaveTextContent("Raichu");
  expect(active).toBeInTheDocument();

  // Clicking the Raichu button
  fireEvent.click(buttons[1]);

  await act(async () => await sleep());

  cards = await getCards();
  expect(cards).toHaveLength(3);

  card = within(cards[0]);
  buttons = card.getAllByRole("button");
  evolution = card.getByTestId("evolution");
  active = within(evolution).getByText("Raichu", {
    selector: "span",
    exact: false,
  });
  expect(buttons).toHaveLength(2);
  expect(buttons[0]).toHaveTextContent("Pichu");
  expect(buttons[1]).toHaveTextContent("Pikachu");
  expect(active).toBeInTheDocument();

  // Clicking the Pikachu button
  fireEvent.click(buttons[1]);

  await act(async () => await sleep());

  cards = await getCards();
  expect(cards).toHaveLength(3);

  card = within(cards[0]);
  buttons = card.getAllByRole("button");
  evolution = card.getByTestId("evolution");
  active = within(evolution).getByText("Pikachu", {
    selector: "span",
    exact: false,
  });
  expect(buttons).toHaveLength(2);
  expect(buttons[0]).toHaveTextContent("Pichu");
  expect(buttons[1]).toHaveTextContent("Raichu");
  expect(active).toBeInTheDocument();
});
