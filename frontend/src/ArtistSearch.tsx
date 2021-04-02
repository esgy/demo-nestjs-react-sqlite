import { useReducer } from "react";

// Helpers
import { getFromAPI } from "./helpers/getFromAPI";
// Types
import { Artist } from "./types/Artist";
import { AppState } from "./types/AppState";
// Components
import { ArtistContainer } from "./components/ArtistContainer";
import { ArtistList } from "./components/ArtistList";
import { SearchForm } from "./components/SearchForm";

// Build Root API URL
const api = getFromAPI(process.env.REACT_APP_API_URL || "");

type Props = {
  state: AppState;
};

export function ArtistSearch({ state: initialState }: Props) {
  const [state, setState] = useReducer(
    (state: AppState, action: any) => ({ ...state, ...action }),
    initialState
  );

  // Handle Form Submit
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

  // Handle Select Artist
  async function onSelectArtist(id: number) {
    setState({ artist: null, loading: true });
    const artist: Artist = await api(`/artist/${id}`);
    setState({ artist, loading: false });
  }

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
