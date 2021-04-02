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

  function onSelectArtist(artist: Artist) {
    console.log(artist);
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
    </div>
  );
}
