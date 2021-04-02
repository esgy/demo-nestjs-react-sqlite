import { Artist } from "../types/Artist";

type Props = {
  artists: Artist[] | null;
  onSelectArtist: (id: number) => void;
};

export function ArtistList({ artists, onSelectArtist }: Props) {
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
              <button
                key={artist.id}
                className="list-group-item list-group-item-action"
                onClick={() => onSelectArtist(artist.id)}
              >
                {artist.name}
              </button>
            );
          })}
        </>
      ) : (
        <div>No results found.</div>
      )}
    </ul>
  );
}
