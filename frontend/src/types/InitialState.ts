import { Artist } from "./Artist";

export type InitialState = {
  searchResult: Artist[] | null;
  artist: Artist | null;
  loading: boolean;
  error: null;
};
