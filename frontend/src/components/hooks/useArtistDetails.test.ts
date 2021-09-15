import { renderHook } from "@testing-library/react-hooks";

import { Artist } from "../../types/Artist";
import { useArtistDetails } from "./useArtistDetails";

describe("useArtistDetails Hook", () => {
  it("should return an object with keys: loading, error, artist", async () => {
    const artist: Artist = {
      id: 1,
      name: "Metallica",
      albums: [],
    };

    const { result, waitForNextUpdate } = renderHook(() => useArtistDetails("1"));

    await waitForNextUpdate();

    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.artist).toEqual(artist);
  });

  it("should return an object with error", async () => {
    const notFoundResponse = {
      statusCode: 404,
      message: "Artist not found.",
      error: "Not Found",
    };

    const { result, waitForNextUpdate } = renderHook(() => useArtistDetails("9999"));

    await waitForNextUpdate();

    expect(result.current.error).toStrictEqual(notFoundResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.artist).toBe(null);
  });
});
