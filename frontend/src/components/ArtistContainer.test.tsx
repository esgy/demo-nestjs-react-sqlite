import { fireEvent, render, screen } from "@testing-library/react";

import { Artist } from "../types/Artist";

import { ArtistContainer } from "./ArtistContainer";

test("render one artist, with no albums", async () => {
  render(<ArtistContainer artistId={1} onClose={() => {}} />);
  const heading = await screen.findByRole("heading");
  expect(heading).toBeInTheDocument();
});

test("render null when no artist selected", async () => {
  render(<ArtistContainer artistId={null} onClose={() => {}} />);

  const albumEl = screen.queryByText(/Albums/);
  expect(albumEl).not.toBeInTheDocument();
});

test("trigger on close", async () => {
  const onClose = jest.fn();

  render(<ArtistContainer artistId={1} onClose={onClose} />);

  const form = await screen.findByRole("button");
  fireEvent.click(form);
  expect(onClose).toHaveBeenCalled();
});

test("render one artist, with multiple albums", async () => {
  const artistWithAlbums: Artist = {
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

  jest
    .spyOn(global, "fetch")
    .mockResolvedValue({ json: () => artistWithAlbums } as any);

  render(<ArtistContainer artistId={1} onClose={() => {}} />);

  const heading = await screen.findByRole("heading");
  expect(heading).toBeInTheDocument();

  const listGroup = await screen.findByTestId("artist-albums");
  expect(listGroup).toBeInTheDocument();
});
