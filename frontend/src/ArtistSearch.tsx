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
  const [state, setState] = useStateReducer({
    searchTerm: "",
    artistId: null,
  });
  // Artists list
  const { artists, loading, error } = useArtistsList(state.searchTerm);

  // Handle Form Submit
  async function onSubmit(searchTerm: string) {
    if (!searchTerm) return;
    setState({ searchTerm });
  }

  // Handle select artist
  async function onSelectArtist(id: number) {
    setState({ artistId: id });
  }

  return (
    <div className="row mt-3">
      <div className="col-12 col-md-6 mx-auto">
        <SearchForm onSubmit={onSubmit} />

        {error ? (
          <div className="bg-danger text-white p-3">{error.message}</div>
        ) : null}

        {loading ? "Loading..." : null}

        {state.artistId ? (
          <ArtistContainer
            artistId={state.artistId}
            onClose={() => setState({ artistId: null })}
          />
        ) : (
          <ArtistList artists={artists} onSelectArtist={onSelectArtist} />
        )}
      </div>
    </div>
  );
}
