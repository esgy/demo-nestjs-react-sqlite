import { Album } from "./Album";

export type Artist = {
  id: string;
  name: string;
  albums: Album[];
};
