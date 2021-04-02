import { FormEvent, useReducer, useRef } from "react";

// Helpers
import { getFromAPI } from "./helpers/getFromAPI";
// Types
import { Artist } from "./types/Artist";
import { InitialState } from "./types/InitialState";
// Components
import { ArtistContainer } from "./components/Artist";
import { ArtistList } from "./components/ArtistList";

const DOMAIN = "http://localhost:3000";
const api = getFromAPI(DOMAIN);

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

    setState({ ...initialState, loading: true });

    // Encode search term
    const searchTerm = encodeURIComponent(inputEl.current?.value || "");
    if (!searchTerm) {
      setState({ ...initialState, loading: false });
      return;
    }

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

  async function onSelectArtist(id: number) {
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

          <button
            id="btnSearch"
            type="submit"
            className="btn btn-primary"
            disabled={!!state.loading}
          >
            Search
          </button>
        </div>
      </form>

      {state.error ? (
        <div className="bg-danger text-white p-3">{state.error.message}</div>
      ) : null}

      {state.loading ? "Loading..." : null}

      {state.artist ? (
        <ArtistContainer
          artist={state.artist}
          onClose={() => setState({ artist: null })}
        />
      ) : (
        <ArtistList
          artists={state.searchResult}
          onSelectArtist={onSelectArtist}
        />
      )}
    </div>
  );
}
