import { FormEvent, useReducer, useRef } from "react";

// Helpers
import { getFromAPI } from "./helpers/getFromAPI";
// Types
import { Artist } from "./types/Artist";

const DOMAIN = "http://localhost:3000";
const api = getFromAPI(DOMAIN);

export function ArtistSearch() {
  const inputEl = useRef<HTMLInputElement>(null);

  const initialState = {
    searchResult: null as Artist[] | null,
    artist: null as Artist | null,
    loading: false,
    error: null,
  };
  const [state, setState] = useReducer(
    (s: any, a: any) => ({ ...s, ...a }),
    initialState
  );

  /**
   * Submit Form
   */
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setState(initialState);

    const searchTerm = inputEl.current?.value;
    if (!searchTerm) return;

    const searchResult: Artist[] = await api(`/artists/search/${searchTerm}`);
    setState({ searchResult, loading: false });
  }

  async function onSelectArtist(id: string) {
    setState({ artist: null, loading: true });
    const artist: Artist = await api(`/artist/${id}`);
    setState({ artist, loading: false });
  }

  function onClearArtist() {
    setState({ artist: null });
  }

  return (
    <div className="container mt-3">
      <form onSubmit={onSubmit} className="mb-3">
        <h4 className="text-muted">Search for your favourite artist</h4>
        <div className="d-flex">
          <input
            id="searchTerm"
            name="searchTerm"
            ref={inputEl}
            className="form-control me-2"
            type="text"
            placeholder="metallica"
            defaultValue=""
          />

          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {state.artist ? null : (
        <ul className="list-group">
          {state.searchResult && <h5>Search results</h5>}
          {state.searchResult &&
            state.searchResult.map((artist: any) => {
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
        </ul>
      )}

      {state.artist ? (
        <>
          <div className="d-flex mt-4 mb-2 justify-content-between align-items-end">
            <h4>{state.artist.name} Albums</h4>
            <button onClick={onClearArtist} className="btn btn-danger">
              Close
            </button>
          </div>

          <ul className="list-group">
            {state.artist.albums && state.artist.albums.length > 0 ? (
              state.artist.albums.map((album: any) => {
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
      ) : null}
    </div>
  );
}
