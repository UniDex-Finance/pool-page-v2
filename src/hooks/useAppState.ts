import { useContext } from "react";
import { store } from "../store/store";

const useAppState = () => useContext(store);

/**
 * Return app store dispatch and state
 * @returns {state, dispatch}
 */
export default useAppState;
