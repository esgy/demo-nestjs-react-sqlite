import { Injectable, NotFoundException } from "@nestjs/common";
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
    const artist = await this.repo.findOne(id, {
      relations: ["albums"],
    });

    if (!artist) {
      throw new NotFoundException("Artist not found.");
    }
    return artist;
  }

  async searchArtistByName(searchTerm: string): Promise<Artist[] | undefined> {
    // Using Like() helper from Typeorm to take care of lowercasing
    return this.repo.find({
      where: {
        name: Like(`%${searchTerm}%`),
      },
      take: 10,
    });
  }
}
