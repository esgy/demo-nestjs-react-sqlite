import { Artist } from "../types/Artist";

type Props = {
  artist: Artist;
  onClose: () => void;
};

export function ArtistContainer({ artist, onClose }: Props) {
  if (!artist) return null;

  function onClearArtist() {
    // setState({ artist: null });
    onClose();
  }

  return (
    <>
      <div className="d-flex mt-4 mb-2 justify-content-between align-items-end">
        <h4>{artist.name} Albums</h4>
        <button onClick={onClearArtist} className="btn btn-danger">
          Close
        </button>
      </div>

      <ul className="list-group">
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
    </>
  );
}
