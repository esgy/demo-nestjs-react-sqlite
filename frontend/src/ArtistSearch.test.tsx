import { render, screen } from "@testing-library/react";

import { ArtistSearch } from "./ArtistSearch";
import { AppState } from "./types/AppState";

test("Artists Search initial render", () => {
  const initialState: AppState = {
    searchResult: null,
    artist: null,
    loading: false,
    error: null,
  };

  render(<ArtistSearch state={initialState} />);
  const artistSearch = screen.getByPlaceholderText("metallica");
  expect(artistSearch).toBeInTheDocument();
});

test("Artists Search loading state", async () => {
  const initialState: AppState = {
    searchResult: null,
    artist: null,
    loading: true,
    error: null,
  };

  render(<ArtistSearch state={initialState} />);
  const artistSearch = await screen.findByText("Loading...");
  expect(artistSearch).toBeInTheDocument();
});

test("Artists Search error state", async () => {
  const initialState: AppState = {
    searchResult: null,
    artist: null,
    loading: false,
    error: new Error("some error message"),
  };

  render(<ArtistSearch state={initialState} />);
  const artistSearch = await screen.findByText("some error message");
  expect(artistSearch).toBeInTheDocument();
});

test("Artists Search render artist", async () => {
  const initialState: AppState = {
    searchResult: null,
    artist: {
      id: 1,
      name: "Metallica",
      albums: [],
    },
    loading: false,
    error: null,
  };

  render(<ArtistSearch state={initialState} />);
  const artistSearch = await screen.findByText("Metallica Albums");
  expect(artistSearch).toBeInTheDocument();
});

test("Artists Search render artist list", async () => {
  const initialState: AppState = {
    searchResult: [
      {
        id: 1,
        name: "Metallica",
        albums: [],
      },
    ],
    artist: null,
    loading: false,
    error: null,
  };

  render(<ArtistSearch state={initialState} />);
  const artistSearch = await screen.findByText("Metallica");
  expect(artistSearch).toBeInTheDocument();
});
