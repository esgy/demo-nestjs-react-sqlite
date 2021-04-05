import { Artist } from "../types/Artist";

type Props = {
  artist: Artist | null;
  onClose: () => void;
};

export function ArtistContainer({ artist, onClose }: Props) {
  if (!artist) return <>No artist</>;

  function onClearArtist() {
    onClose();
  }

  return (
    <div className="col-12 col-md-6 mx-auto">
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-end">
        <h4>{artist.name} Albums</h4>
        <button onClick={onClearArtist} className="btn btn-danger">
          Close
        </button>
      </div>

      <ul className="list-group" data-testid="artist-albums">
        {artist.albums && artist.albums.length > 0 ? (
          artist.albums.map((album: any) => {
            return (
              <li key={album.id} className="list-group-item">
                {album.title}
              </li>
            );
          })
        ) : (
          <div className="text-danger">No albums found.</div>
        )}
      </ul>
    </div>
  );
}
