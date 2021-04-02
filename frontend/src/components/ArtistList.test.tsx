import { render, screen } from "@testing-library/react";

import { Artist } from "../types/Artist";
import { ArtistList } from "./ArtistList";

test("ArtistList", () => {
  const artists: Artist[] = [
    {
      id: 1,
      name: "Metallica",
      albums: [],
    },
  ];

  render(<ArtistList artists={artists} onSelectArtist={() => {}} />);

  const artistsHeading = screen.getByRole("heading");
  expect(artistsHeading).toBeInTheDocument();
  expect(artistsHeading).toContainHTML("Search results");

  const artistsButton = screen.getByRole("button");
  expect(artistsButton).toBeInTheDocument();
  expect(artistsButton).toContainHTML("Metallica");
});
