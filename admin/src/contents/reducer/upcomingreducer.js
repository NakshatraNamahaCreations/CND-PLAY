import {
    CREATE_UPCOMING,
    RETRIEVE_UPCOMING,
    UPDATE_UPCOMING,
    DELETE_UPCOMING,
  } from "../actions/type";
  const initialState = [];
  function UpcomingReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_UPCOMING:
        return {data: [...state.data], payload};
      case RETRIEVE_UPCOMING:
        state = (payload.error == 1)?initialState:payload;
        // Object.assign(state,payload);
        // console.log("state", {data: [...state], payload});
        return {data: [...state], payload};
        // return {data: [...state], payload};
      case UPDATE_UPCOMING:
        return {data: [...state.data], payload};
      case DELETE_UPCOMING:
        return {data: [...state.data], payload};
      default:
        return state;
    }
  };
  export {UpcomingReducer};