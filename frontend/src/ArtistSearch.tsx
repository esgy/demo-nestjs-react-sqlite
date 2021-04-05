// Types
import { Artist } from "./types/Artist";

// Helpers
import { getFromAPI } from "./helpers/getFromAPI";

// Components
import { ArtistContainer } from "./components/ArtistContainer";
import { ArtistList } from "./components/ArtistList";
import { SearchForm } from "./components/SearchForm";

// Hooks
import { useStateReducer } from "./helpers/useStateReducer";
import { useArtistsList } from "./components/hooks/useArtistsList";

// Build Root API URL
export const api = getFromAPI(process.env.REACT_APP_API_URL || "");

export function ArtistSearch() {
  // local component state
  const [state, setState] = useStateReducer({ searchTerm: "" });
  // Artists list
  const { artists, loading, error } = useArtistsList(state.searchTerm);

  // Handle Form Submit
  async function onSubmit(searchTerm: string) {
    if (!searchTerm) return;
    setState({ searchTerm });
  }

  // Handle select artist
  async function onSelectArtist(id: number) {
    setState({ artist: null, loading: true });
    const artist: Artist = await api(`/artist/${id}`);
    setState({ artist, loading: false });
  }

  return (
    <div className="container mt-3">
      <SearchForm onSubmit={onSubmit} />

      {error ? (
        <div className="bg-danger text-white p-3">{error.message}</div>
      ) : null}

      {loading ? "Loading..." : null}

      {state.artist ? (
        <ArtistContainer
          artist={state.artist}
          onClose={() => setState({ artist: null })}
        />
      ) : (
        <ArtistList artists={artists} onSelectArtist={onSelectArtist} />
      )}
    </div>
  );
}
