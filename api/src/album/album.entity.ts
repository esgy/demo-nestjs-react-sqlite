import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Artist } from "../artist/artist.entity";

@Entity({ name: "albums" })
export class Album {
  @PrimaryColumn({ name: "AlbumId" })
  id!: number;

  @Column({ name: "Title" })
  title!: string;

  @Column({ name: "ArtistId", type: "integer" })
  @ManyToOne(() => Artist)
  artist!: Artist;
}
