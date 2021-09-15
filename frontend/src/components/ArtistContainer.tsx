import { Link, useParams } from "react-router-dom";

import { useArtistDetails } from "../components/hooks/useArtistDetails";

export function ArtistContainer() {
  let { id } = useParams();
  const { artist, loading, error } = useArtistDetails(id);

  if (!artist) return null;

  return (
    <>
      {error ? <div className="bg-danger text-white p-3">{error.message}</div> : null}

      {loading ? "Loading..." : null}

      <div className="d-flex mt-4 mb-2 justify-content-between align-items-end">
        <h4>{artist.name} Albums</h4>
        <Link to={"/"} className="btn btn-danger">
          Close
        </Link>
      </div>

      {artist.albums && artist.albums.length > 0 ? (
        <ul className="list-group" data-testid="artist-albums">
          {artist.albums.map((album: any) => {
            return (
              <li key={album.id} className="list-group-item">
                {album.title}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-danger">No albums found.</div>
      )}
    </>
  );
}
