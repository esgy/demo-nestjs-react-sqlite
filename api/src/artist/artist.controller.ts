import { Controller, Get, Param } from "@nestjs/common";
import { GetArtistDto } from "./artist.controller.dto";
import { Artist } from "./artist.entity";
import { ArtistService } from "./artist.service";

@Controller()
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get("artist/:id")
  async getArtist(@Param() { id }: GetArtistDto): Promise<Artist | undefined> {
    return this.artistService.getById(id);
  }

  @Get("artists/search/:term")
  async searchArtistByName(
    @Param() { term }: { term: string }
  ): Promise<Artist[] | undefined> {
    return this.artistService.searchArtistByName(term);
  }
}
