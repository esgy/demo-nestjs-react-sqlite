import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

const main = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = app.get(ConfigService);
  const logger = app.get(Logger);

  const port = parseInt(config.get<string>("PORT") || "") || 5001;

  await app.listen(port);

  logger.log(`Listening on port: ${port}`);
};

main();
