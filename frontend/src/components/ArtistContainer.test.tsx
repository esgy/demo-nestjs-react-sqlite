import { fireEvent, render, screen } from "@testing-library/react";

import { Artist } from "../types/Artist";
import { ArtistContainer } from "./ArtistContainer";

test("render one artist, with no albums", async () => {
  const artist: Artist = {
    id: 1,
    name: "Metallica",
    albums: [],
  };

  render(<ArtistContainer artist={artist} onClose={() => {}} />);
  const heading = await screen.findByRole("heading");
  expect(heading).toBeInTheDocument();
});

test("render no artist found", async () => {
  const artist: Artist | null = null;

  render(<ArtistContainer artist={artist} onClose={() => {}} />);
  const heading = await screen.findByText("No artist");
  expect(heading).toBeInTheDocument();
});

test("trigger on close", async () => {
  const artist: Artist = {
    id: 1,
    name: "Metallica",
    albums: [],
  };
  const onClose = jest.fn();

  render(<ArtistContainer artist={artist} onClose={onClose} />);

  const form = await screen.findByRole("button");
  fireEvent.click(form);
  expect(onClose).toHaveBeenCalled();
});

test("render one artist, with multiple albums", async () => {
  const artist: Artist = {
    id: 1,
    name: "Metallica",
    albums: [
      {
        id: 1,
        title: "Metallica 1",
      },
      {
        id: 2,
        title: "Metallica 2",
      },
    ],
  };

  render(<ArtistContainer artist={artist} onClose={() => {}} />);
  const heading = await screen.findByRole("heading");
  expect(heading).toBeInTheDocument();

  const listGroup = await screen.findByTestId("artist-albums");
  // console.log("listGroup", listGroup);

  expect(listGroup).toBeInTheDocument();
});
