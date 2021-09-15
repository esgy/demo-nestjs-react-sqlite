import { Routes, Route, MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Artist } from "../types/Artist";

import { ArtistContainer } from "./ArtistContainer";

test("render one artist, with no albums", async () => {
  const artistNoAlbums: Partial<Artist> = {
    id: 1,
    name: "Metallica",
  };

  jest.spyOn(global, "fetch").mockResolvedValue({ json: () => artistNoAlbums } as any);

  render(
    <MemoryRouter initialEntries={["/artist/1"]}>
      <Routes>
        <Route path="/artist/:id" element={<ArtistContainer />} />
      </Routes>
    </MemoryRouter>
  );
  const heading = await screen.findByRole("heading");
  expect(heading).toBeInTheDocument();
});

test("render null when no artist selected", async () => {
  render(<ArtistContainer />, { wrapper: MemoryRouter });

  const albumEl = screen.queryByText(/Albums/);
  expect(albumEl).not.toBeInTheDocument();
});

// test("trigger on close", async () => {
//   // const onClose = jest.fn();

//   render(<ArtistContainer />, { wrapper: MemoryRouter });

//   const link = await screen.findByRole("link");
//   userEvent.click(link);
//   // expect(onClose).toHaveBeenCalled();
// });

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

  jest.spyOn(global, "fetch").mockResolvedValue({ json: () => artistWithAlbums } as any);

  render(
    <MemoryRouter initialEntries={["/artist/1"]}>
      <Routes>
        <Route path="/artist/:id" element={<ArtistContainer />} />
      </Routes>
    </MemoryRouter>
  );

  const heading = await screen.findByRole("heading");
  expect(heading).toBeInTheDocument();

  const listGroup = await screen.findByTestId("artist-albums");
  expect(listGroup).toBeInTheDocument();
});
