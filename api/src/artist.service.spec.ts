import { Test, TestingModule } from "@nestjs/testing";
import { Like } from "typeorm";
import { ArtistModule } from "./artist.module";
import { ArtistRepository } from "./artist.repository";
import { ArtistService } from "./artist.service";

describe("ArtistService", () => {
  let service: ArtistService;
  const repo: Partial<jest.Mocked<ArtistRepository>> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ArtistModule],
    })
      .overrideProvider(ArtistRepository)
      .useValue(repo)
      .compile();

    service = module.get(ArtistService);
  });

  it("getById delegates to ArtistRepository#findOne", async () => {
    repo.findOne = jest.fn().mockImplementation((id: number) =>
      Promise.resolve({
        id,
        name: "Foo",
        albums: [],
      })
    );
    const result = await service.getById(99);

    expect(repo.findOne).toBeCalledWith(99);
    expect(result).toEqual({
      id: 99,
      name: "Foo",
      albums: [],
    });
  });

  it("searchArtistByName delegates to ArtistRepository#find", async () => {
    const searchTerm = "Metallica";

    repo.find = jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          name: "Metallica",
          albums: [],
        },
      ])
    );
    const result = await service.searchArtistByName(searchTerm);

    const expected = {
      take: 10,
      where: {
        name: Like(`%${searchTerm}%`),
      },
    };

    expect(repo.find).toBeCalledWith(expected);

    expect(result).toEqual([
      {
        id: 1,
        name: searchTerm,
        albums: [],
      },
    ]);
  });
});
