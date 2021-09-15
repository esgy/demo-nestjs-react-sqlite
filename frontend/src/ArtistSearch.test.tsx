import { render, screen } from "@testing-library/react";

import { ArtistSearch } from "./ArtistSearch";

test("Artists Search initial render", () => {
  render(<ArtistSearch />);
  const artistSearch = screen.getByPlaceholderText("ex: Metallica");
  expect(artistSearch).toBeInTheDocument();
});
