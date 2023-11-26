import actions from "./actions";

export default (state: any, action: any) => {
  switch (action.type) {
    case actions.SET_INITIAL_DATA: {
      const data = action.payload;
      return {
        ...state,
        ...data,
      };
    }
    /*
    case actions.SET_POOL_ROWS: {
      const data = action.payload;
      return {
        ...state,
        poolRows: data,
      };
    }
    */
    case actions.SET_PRICES: {
      const data = action.payload;
      return {
        ...state,
        prices: data,
      };
    }
    case actions.SET_POOL_DATA: {
      const data = action.payload;
      return {
        ...state,
        poolData: data,
      };
    }
    default:
      return state;
  }
};
