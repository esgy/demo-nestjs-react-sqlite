import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  render(<App />);
  const artistSearch = screen.getByPlaceholderText("ex: Metallica");

  expect(artistSearch).toBeInTheDocument();
});
