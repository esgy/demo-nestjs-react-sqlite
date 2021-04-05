import { SyntheticEvent, useRef } from "react";

type Props = {
  onSubmit: (searchTerm: string) => void;
};

export function SearchForm({ onSubmit }: Props) {
  const inputEl = useRef<HTMLInputElement>(null);

  function onFormSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const searchTerm = encodeURIComponent(inputEl.current?.value || "");
    onSubmit(searchTerm);
  }

  return (
    <form onSubmit={onFormSubmit} className="mb-3" data-testid="form">
      <label htmlFor="searchTerm" className="text-muted">
        Search artist
      </label>
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

        <button id="btnSearch" type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
}
