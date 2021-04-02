import { ArtistSearch } from "./ArtistSearch";
import { AppState } from "./types/AppState";

// Setup initial state
const initialState: AppState = {
  searchResult: null,
  artist: null,
  loading: false,
  error: null,
};

function App() {
  return <ArtistSearch state={initialState} />;
}

export default App;
