import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "typeorm";
import { Artist } from "./artist.entity";
import { ArtistRepository } from "./artist.repository";

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistRepository) readonly repo: ArtistRepository
  ) {}

  async getById(id: number): Promise<Artist | undefined> {
    return this.repo.findOne(id);
  }

  async searchArtistByName(searchTerm: string): Promise<Artist[] | undefined> {
    return this.repo.find({
      where: {
        name: Like(`%${searchTerm}%`),
      },
      take: 10,
    });
  }
}
