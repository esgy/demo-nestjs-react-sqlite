import { FormEvent, useReducer, useRef } from "react";

// Helpers
import { getFromAPI } from "./helpers/getFromAPI";
// Types
import { Artist } from "./types/Artist";
// Components
import { ArtistContainer } from "./components/Artist";

const DOMAIN = "http://localhost:3000";
const api = getFromAPI(DOMAIN);

type InitialState = {
  searchResult: Artist[] | null;
  artist: Artist | null;
  loading: boolean;
  error: null;
};

export function ArtistSearch() {
  const inputEl = useRef<HTMLInputElement>(null);

  const initialState: InitialState = {
    searchResult: null,
    artist: null,
    loading: false,
    error: null,
  };
  const [state, setState] = useReducer(
    (state: InitialState, action: any) => ({ ...state, ...action }),
    initialState
  );

  /**
   * Submit Form
   */
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setState(initialState);

    // Encode search term
    const searchTerm = encodeURIComponent(inputEl.current?.value || "");
    if (!searchTerm) return;

    const searchResult = await api(`/artists/search/${searchTerm}`);

    if (searchResult.error) {
      setState({
        searchResult: null,
        loading: false,
        error: searchResult,
      });
    } else {
      setState({ searchResult, loading: false, error: null });
    }
  }

  async function onSelectArtist(id: string) {
    setState({ artist: null, loading: true });
    const artist: Artist = await api(`/artist/${id}`);
    setState({ artist, loading: false });
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

          <button id="btnSearch" type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {state.error ? (
        <div className="bg-danger text-white p-3">{state.error.message}</div>
      ) : null}

      {state.artist ? (
        <ArtistContainer
          artist={state.artist}
          onClose={() => setState({ artist: null })}
        />
      ) : (
        <ul className="list-group">
          {state.searchResult && <h5>Search results</h5>}
          {state.searchResult && state.searchResult.length > 0 ? (
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
            })
          ) : (
            <div>No results found.</div>
          )}
        </ul>
      )}
    </div>
  );
}
