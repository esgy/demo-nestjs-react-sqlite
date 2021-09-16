import { BrowserRouter, Routes, Route } from "react-router-dom";

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

  // Handle Search Form Submit
  function onSubmit(searchTerm: string) {
    setState({ searchTerm });
  }

  return (
    <BrowserRouter>
      <div className="row mt-3">
        <div className="col-12 col-md-6 mx-auto">
          <SearchForm onSubmit={onSubmit} />

          {error ? <div className="bg-danger text-white p-3">{error.message}</div> : null}

          {loading ? "Loading..." : null}

          <Routes>
            <Route path="/" element={<ArtistList artists={artists} />} />
            <Route path="/artist/:id" element={<ArtistContainer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
