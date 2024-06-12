import {
    MAKE_REGISTER,
  } from "../actions/type";
  const initialState = [];
  function RegisterReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case MAKE_REGISTER:
        return {data: [...state.data], payload};
      default:
        return state;
    }
  };
  export {RegisterReducer};