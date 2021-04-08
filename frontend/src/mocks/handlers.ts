import { rest } from "msw";

export const handlers = [
  // GET artist/1
  rest.get("http://localhost:3000/artist/:id", (req, res, ctx) => {
    const artistId = req.params.id;

    // Return ERROR 404 not found
    if (artistId !== "1") {
      const notFoundResponse = {
        statusCode: 404,
        message: "Artist not found.",
        error: "Not Found",
      };

      return res(ctx.status(404), ctx.json(notFoundResponse));
    }

    // Return found item
    return res(
      ctx.json({
        id: 1,
        name: "Metallica",
        albums: [],
      })
    );
  }),

  // GET /artists/search/:term
  rest.get("http://localhost:3000/search/:term", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "Metallica",
          albums: [],
        },
        {
          id: 2,
          name: "Queen",
          albums: [
            {
              id: 1,
              title: "Queen",
            },
          ],
        },
      ])
    );
  }),
];
