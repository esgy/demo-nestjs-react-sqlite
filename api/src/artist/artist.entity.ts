import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Album } from "../album/album.entity";

@Entity({ name: "artists" })
export class Artist {
  @PrimaryColumn({ name: "ArtistId" })
  id!: number;

  @Column({ name: "Name" })
  name!: string;

  @OneToMany(() => Album, (a) => a.artist)
  albums!: Album[];
}
