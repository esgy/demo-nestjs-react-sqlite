import { useEffect } from "react";
import { api } from "../../ArtistSearch";
import { useStateReducer } from "../../helpers/useStateReducer";
import { Artist } from "../../types/Artist";

type State = {
  artists: Artist[] | null;
  loading: boolean;
  error: Error | null;
};

export function useArtistsList(searchTerm: string): State {
  const [state, setState] = useStateReducer({ loading: false, error: null });

  useEffect(() => {
    (async function getArtistsList() {
      if (!searchTerm.trim()) return;

      const artists = await api(`/artists/search/${searchTerm}`);

      if (artists && artists.error) {
        setState({
          artists: null,
          loading: false,
          error: artists,
        });
      } else {
        setState({ artists, loading: false, error: null });
      }
    })();
  }, [searchTerm, setState]);

  return { ...state };
}
