import {
  CREATE_SERIES,
  RETRIEVE_SERIES,
  UPDATE_SERIES,
  DELETE_SERIES,
} from "../actions/type";
const initialState = [];
function SeriesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_SERIES:
      return {data: [...state.data], payload};
    case RETRIEVE_SERIES:
      state = (payload.error == 1)?initialState:payload;
      // Object.assign(state,payload);
      // console.log("state", {data: [...state], payload});
      return {data: [...state], payload};
      // return {data: [...state], payload};
    case UPDATE_SERIES:
      return {data: [...state.data], payload};
    case DELETE_SERIES:
      return {data: [...state.data], payload};
    default:
      return state;
  }
};
export {SeriesReducer};