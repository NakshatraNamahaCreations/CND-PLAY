import {
    CREATE_USER,
    RETRIEVE_USER,
    UPDATE_USER,
    DELETE_USER,
  } from "../actions/type";
  const initialState = [];
  function UserTabReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_USER:
        return {data: [...state.data], payload};
      case RETRIEVE_USER:
        // console.log((payload.error));
        state = (payload.error == 1)?initialState:payload;
        // console.log(state);
        return {data: [...state], payload};
      case UPDATE_USER:
        return {data: [...state.data], payload};
      case DELETE_USER:
        return {data: [...state.data], payload};
      default:
        return state;
    }
  };
  export {UserTabReducer};