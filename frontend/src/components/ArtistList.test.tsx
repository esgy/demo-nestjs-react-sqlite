import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Artist } from "../types/Artist";
import { ArtistList } from "./ArtistList";

test("ArtistList renders items", () => {
  const artists: Artist[] = [
    {
      id: 1,
      name: "Metallica",
      albums: [],
    },
  ];

  render(<ArtistList artists={artists} />, { wrapper: MemoryRouter });

  const artistsHeading = screen.getByRole("heading");
  expect(artistsHeading).toBeInTheDocument();
  expect(artistsHeading).toContainHTML("Search results");

  const artistsButton = screen.getByRole("link", { name: "Metallica" });
  expect(artistsButton).toBeInTheDocument();
  expect(artistsButton).toContainHTML("Metallica");
});

test("ArtistList click list item", async () => {
  const artists: Artist[] = [
    {
      id: 1,
      name: "Metallica",
      albums: [],
    },
  ];
  // const onSelectArtist = jest.fn();

  render(<ArtistList artists={artists} />, { wrapper: MemoryRouter });

  const artistsButton = screen.getByRole("link", { name: "Metallica" });
  expect(artistsButton).toBeInTheDocument();

  const link = await screen.findByRole("link");
  userEvent.click(link);
  // expect(onSelectArtist).toHaveBeenCalled();
});

test("ArtistList renders No results found on empty list", () => {
  const artists: Artist[] = [];

  render(<ArtistList artists={artists} />, { wrapper: MemoryRouter });

  const artistsList = screen.getByRole("list");
  expect(artistsList).toContainHTML("No results found");
});

test("ArtistList don't render on null list", () => {
  const artists = null;

  render(<ArtistList artists={artists} />, { wrapper: MemoryRouter });

  // must use query* when testing for missing elements
  const artistsHeading = screen.queryByText("Search results");
  expect(artistsHeading).toBeNull();
});
