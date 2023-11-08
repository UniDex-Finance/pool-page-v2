import React, { createContext, useReducer } from "react";
import initialState from "./initialState";
import reducer from "./reducer";

const store = createContext<any>({ ...initialState });

const { Provider } = store;

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
