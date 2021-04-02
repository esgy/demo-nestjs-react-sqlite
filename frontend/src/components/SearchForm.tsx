import { FormEvent, useRef } from "react";
import { AppState } from "../types/AppState";

type Props = {
  state: AppState;
  onSubmit: (searchTerm: string) => void;
};

export function SearchForm({ state, onSubmit }: Props) {
  const inputEl = useRef<HTMLInputElement>(null);

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Encode search term
    const searchTerm = encodeURIComponent(inputEl.current?.value || "");
    onSubmit(searchTerm);
  }

  return (
    <form onSubmit={onFormSubmit} className="mb-3" data-testid="form">
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
  );
}
