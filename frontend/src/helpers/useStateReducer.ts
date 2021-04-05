import { useReducer } from "react";

type State = {
  [key: string]: any;
  loading?: boolean;
  error?: Error | null;
};

// Helper to handle local component state
export function useStateReducer(initialState: State) {
  const [state, useState] = useReducer(
    (state: any, action: any) => ({ ...state, ...action }),
    initialState
  );

  return [state, useState];
}
