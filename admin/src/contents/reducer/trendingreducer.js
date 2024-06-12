import {
    CREATE_TRENDING,
    RETRIEVE_TRENDING,
    UPDATE_TRENDING,
    DELETE_TRENDING,
  } from "../actions/type";
  const initialState = [];
  function TrendingReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_TRENDING:
        return {data: [...state.data], payload};
      case RETRIEVE_TRENDING:
        state = (payload.error == 1)?initialState:payload;
        // Object.assign(state,payload);
        // console.log("state", {data: [...state], payload});
        return {data: [...state], payload};
        // return {data: [...state], payload};
      case UPDATE_TRENDING:
        return {data: [...state.data], payload};
      case DELETE_TRENDING:
        return {data: [...state.data], payload};
      default:
        return state;
    }
  };
  export {TrendingReducer};