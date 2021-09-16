import { SyntheticEvent, useRef } from "react";

type Props = {
  onSubmit: (searchText: string) => void;
};

export function SearchForm({ onSubmit }: Props) {
  const inputEl = useRef<HTMLInputElement>(null);

  function onFormSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const searchText = encodeURIComponent(inputEl.current?.value || "");
    onSubmit(searchText);
  }

  return (
    <form onSubmit={onFormSubmit} className="mb-3" data-testid="form">
      <label htmlFor="searchText" className="text-muted fw-bold mb-2">
        Search for artist
      </label>
      <div className="d-flex">
        <input
          id="searchText"
          name="searchText"
          ref={inputEl}
          className="form-control me-2"
          type="text"
          placeholder="ex: Metallica"
          defaultValue=""
        />

        <button id="btnSearch" type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
}
