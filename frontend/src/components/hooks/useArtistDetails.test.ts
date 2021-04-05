import { renderHook } from "@testing-library/react-hooks";

import { Artist } from "../../types/Artist";
import { useArtistDetails } from "./useArtistDetails";

const artist: Artist = {
  id: 1,
  name: "Metallica",
  albums: [],
};

describe("useArtistDetails Hook", () => {
  it("should return an object with keys: loading, error, artist", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue({ json: () => artist } as any);

    const { result, waitForNextUpdate } = renderHook(() => useArtistDetails(1));

    await waitForNextUpdate();

    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.artist).toBe(artist);
  });

  it("should return an object with error", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: () => ({
        statusCode: 404,
        message: "Artist not found.",
        error: "Not Found",
      }),
    } as any);

    const { result, waitForNextUpdate } = renderHook(() => useArtistDetails(1));

    await waitForNextUpdate();

    expect(result.current.error).toStrictEqual({
      error: "Not Found",
      message: "Artist not found.",
      statusCode: 404,
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.artist).toBe(null);
  });
});
