import {
  CREATE_GENRES,
  RETRIEVE_GENRES,
  UPDATE_GENRES,
  DELETE_GENRES,
} from "../actions/type";
const initialState = [];
function GenresReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_GENRES:
      return {data: [...state.data], payload};
    case RETRIEVE_GENRES:
      state = (payload.error == 1)?initialState:payload;
      // Object.assign(state,payload);
      // console.log("state", {data: [...state], payload});
      return {data: [...state], payload};
      // return {data: [...state], payload};
    case UPDATE_GENRES:
      return {data: [...state.data], payload};
    case DELETE_GENRES:
      return {data: [...state.data], payload};
    default:
      return state;
  }
};
export {GenresReducer};