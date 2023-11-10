import React, { createContext, useReducer } from "react";
import initialState from "./initialState";
import actions from "./actions";
import reducer from "./reducer";

const store = createContext<any>({ ...initialState });

const { Provider } = store;

interface Props {
  children: React.ReactNode;
}

const StateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { actions, store, StateProvider };
