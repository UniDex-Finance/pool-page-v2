// import { useEffect } from "react";
// import useAppState from "./useAppState";
// import PersistentStorage from "../services/PersistentStorage";
// import { actions } from "../store/store";
// import { getURLSearchParam } from "../helpers";

const useInitialState = () => {
  /*
  const { state, dispatch } = useAppState();

  useEffect(() => {
    
    const store = PersistentStorage.getAll();
    const referralCode = getURLSearchParam("ref");
    if (referralCode) {
      store.referralCode = referralCode;
      PersistentStorage.set("referralCode", referralCode);
    }
    

    dispatch({
      type: actions.SET_INITIAL_DATA,
      payload: store,
    });
    
  }, [dispatch]);

  return null;
  */
};

export default useInitialState;
