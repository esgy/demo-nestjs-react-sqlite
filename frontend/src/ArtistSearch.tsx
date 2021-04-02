import { useReducer } from "react";

// Helpers
import { getFromAPI } from "./helpers/getFromAPI";
// Types
import { Artist } from "./types/Artist";
import { AppState } from "./types/AppState";
// Components
import { ArtistContainer } from "./components/Artist";
import { ArtistList } from "./components/ArtistList";
import { SearchForm } from "./components/SearchForm";

const api = getFromAPI(process.env.REACT_APP_API_URL || "");

export function ArtistSearch() {
  const initialState: AppState = {
    searchResult: null,
    artist: null,
    loading: false,
    error: null,
  };
  const [state, setState] = useReducer(
    (state: AppState, action: any) => ({ ...state, ...action }),
    initialState
  );

  async function onSubmit(searchTerm: string) {
    setState({ ...initialState, loading: true });

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

  console.log("state.searchResult", state.searchResult);

  return (
    <div className="container mt-3">
      <SearchForm state={state} onSubmit={onSubmit} />

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
