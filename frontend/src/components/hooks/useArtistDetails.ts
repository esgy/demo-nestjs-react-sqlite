import { useEffect } from "react";
import { api } from "../../ArtistSearch";
import { useStateReducer } from "../../helpers/useStateReducer";
import { Artist } from "../../types/Artist";

type State = {
  artist: Artist | null;
  loading: boolean;
  error: Error | null;
};

export function useArtistDetails(id?: number): State {
  const [state, setState] = useStateReducer({ loading: false, error: null });
  useEffect(() => {
    (async function getArtistDetails() {
      if (!id) return;

      const artist = await api(`/artist/${id}`);

      if (artist && artist.error) {
        setState({
          artist: null,
          loading: false,
          error: artist,
        });
      } else {
        setState({ artist, loading: false, error: null });
      }
    })();
  }, [id, setState]);

  return { ...state };
}
