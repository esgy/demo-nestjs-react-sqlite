import { Artist } from "./Artist";

export type AppState = {
  searchResult: Artist[] | null;
  artist: Artist | null;
  loading: boolean;
  error: Error | null;
};
