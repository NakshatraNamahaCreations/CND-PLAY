import {
    FILE_UPLOAD
  } from "../actions/type";
  const initialState = [];
  function FileUploadReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case FILE_UPLOAD:
        // console.log(state, payload)
        state = state.length?[...state.data]:payload;
        return {data: state};
      default:
        return state;
    }
  };
  export {FileUploadReducer};