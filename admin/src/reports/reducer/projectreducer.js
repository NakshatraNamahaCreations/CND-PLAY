import {
  CREATE_PROJECT,
  RETRIEVE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../actions/type";
const initialState = [];
function ProjectReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PROJECT:
      return {data: [...state.data], payload};
    case RETRIEVE_PROJECT:
      state = (payload.error == 1)?initialState:payload;
      // Object.assign(state,payload);
      // console.log("state", {data: [...state], payload});
      return {data: [...state], payload};
      // return {data: [...state], payload};
    case UPDATE_PROJECT:
      return {data: [...state.data], payload};
    case DELETE_PROJECT:
      return {data: [...state.data], payload};
    default:
      return state;
  }
};
export {ProjectReducer};