import path from "path";
import { Module, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArtistModule } from "./artist/artist.module";

@Module({
  imports: [
    ConfigService,
    Logger,
    ArtistModule,
    TypeOrmModule.forRoot({
      type: "better-sqlite3",
      database: path.resolve(__dirname, "..", "chinook.db"),
      synchronize: false,
      entities: [path.resolve(__dirname, "**/*.entity.*")],
      logging: true,
    }),
  ],
})
export class AppModule {}
