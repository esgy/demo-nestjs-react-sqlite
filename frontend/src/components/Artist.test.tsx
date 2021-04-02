import { render, screen } from "@testing-library/react";

import { Artist } from "../types/Artist";
import { ArtistContainer } from "./Artist";

test("ArtistContainer", () => {
  const artist: Artist = {
    id: 1,
    name: "Metallica",
    albums: [],
  };

  render(<ArtistContainer artist={artist} onClose={() => {}} />);

  const artistAlbum = screen.getByRole("heading");

  expect(artistAlbum).toBeInTheDocument();
});
