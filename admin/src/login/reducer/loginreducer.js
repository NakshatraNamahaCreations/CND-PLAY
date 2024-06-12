import {
    MAKE_LOGIN,
  } from "../actions/type";
  const initialState = [];
  function LoginReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case MAKE_LOGIN:
        return {data: [...state], payload};
      default:
        return state;
    }
  };
  export {LoginReducer};