import { Artist } from "../types/Artist";

type Props = {
  artists: Artist[];
  onSelectArtist: (id: number) => void;
};

export function ArtistList({ artists, onSelectArtist }: Props) {
  return (
    <ul className="list-group">
      {artists && artists.length > 0 ? (
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
