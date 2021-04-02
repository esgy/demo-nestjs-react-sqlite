import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistController } from "./artist.controller";
import { Artist } from "./artist.entity";
import { ArtistRepository } from "./artist.repository";
import { ArtistService } from "./artist.service";

@Module({
  imports: [TypeOrmModule.forFeature([Artist, ArtistRepository])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
