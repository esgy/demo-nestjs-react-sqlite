import { Test, TestingModule } from "@nestjs/testing";
import { ArtistController } from "./artist.controller";
import { ArtistModule } from "./artist.module";
import { ArtistRepository } from "./artist.repository";
import { ArtistService } from "./artist.service";

describe("Artist Controller", () => {
  let controller: ArtistController;
  const artistService: Partial<jest.Mocked<ArtistService>> = {
    getById: jest.fn(),
  };

  afterEach(() => jest.resetAllMocks());

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ArtistModule],
    })
      .overrideProvider(ArtistService)
      .useValue(artistService)
      .overrideProvider(ArtistRepository)
      .useValue({})
      .compile();

    controller = module.get(ArtistController);
  });

  it("getById resolves with Artist", async () => {
    artistService.getById?.mockResolvedValue({
      id: 42,
      name: "Foo",
      albums: [],
    });

    await expect(controller.getArtist({ id: 1 })).resolves.toEqual({
      id: 42,
      name: "Foo",
      albums: [],
    });
  });
});
