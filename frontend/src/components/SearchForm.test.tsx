import { fireEvent, render, screen } from "@testing-library/react";
import { AppState } from "../types/AppState";

// import { Artist } from "../types/Artist";
import { SearchForm } from "./SearchForm";

test("SearchForm", () => {
  const initialState: AppState = {
    searchResult: null,
    artist: null,
    loading: false,
    error: null,
  };
  const onSubmit = jest.fn();

  render(<SearchForm state={initialState} onSubmit={onSubmit} />);

  // heading
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();

  // textbox
  const textbox = screen.getByRole("textbox");
  expect(textbox).toBeInTheDocument();

  //button
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();

  const form = screen.getByTestId("form");
  fireEvent.submit(form);
  expect(onSubmit).toHaveBeenCalled();
});
