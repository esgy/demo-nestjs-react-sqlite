import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { Artist } from "../types/Artist";

import { ArtistContainer } from "./ArtistContainer";
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

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({ json: () => artist } as any);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("render one artist, with no albums", async () => {
  render(<ArtistContainer artistId={1} onClose={() => {}} />);
  const heading = await screen.findByRole("heading");
  expect(heading).toBeInTheDocument();
});

test("render null when no artist selected", async () => {
  jest.spyOn(global, "fetch").mockResolvedValue({ json: () => null } as any);

  render(<ArtistContainer artistId={2} onClose={() => {}} />);

  await waitFor(() => {
    expect(screen.queryByTestId("artist-albums")).not.toBeInTheDocument();
  });
});

test("trigger on close", async () => {
  const onClose = jest.fn();

  render(<ArtistContainer artistId={1} onClose={onClose} />);

  const form = await screen.findByRole("button");
  fireEvent.click(form);
  expect(onClose).toHaveBeenCalled();
});

test("render one artist, with multiple albums", async () => {
  render(<ArtistContainer artistId={1} onClose={() => {}} />);

  const heading = await screen.findByRole("heading");
  expect(heading).toBeInTheDocument();
  const listGroup = await screen.findByTestId("artist-albums");
  // console.log("listGroup", listGroup);
  expect(listGroup).toBeInTheDocument();
});
