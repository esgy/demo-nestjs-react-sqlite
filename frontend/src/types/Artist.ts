import { Album } from "./Album";

export type Artist = {
  id: number;
  name: string;
  albums: Album[];
};
