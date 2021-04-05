import { fireEvent, render, screen } from "@testing-library/react";

// import { Artist } from "../types/Artist";
import { SearchForm } from "./SearchForm";

test("SearchForm", () => {
  const onSubmit = jest.fn();

  render(<SearchForm onSubmit={onSubmit} />);

  // heading
  const heading = screen.getByLabelText(/Search artist/i);
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
