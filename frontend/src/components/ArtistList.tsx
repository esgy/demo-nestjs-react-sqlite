import { Link } from "react-router-dom";

import { Artist } from "../types/Artist";

type Props = {
  artists: Artist[] | null;
};

export function ArtistList({ artists }: Props) {
  // default state is null, but we can also get 0 items
  if (artists?.length === undefined) {
    return null;
  }

  return (
    <ul className="list-group">
      {artists.length > 0 ? (
        <>
          <h5>Search results</h5>
          {artists.map((artist: any) => {
            return (
              <Link
                key={artist.id}
                className="list-group-item list-group-item-action"
                to={`/artist/${artist.id}`}
              >
                {artist.name}
              </Link>
            );
          })}
        </>
      ) : (
        <div>No results found.</div>
      )}
    </ul>
  );
}
