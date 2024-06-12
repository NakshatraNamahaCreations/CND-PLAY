import {
  CREATE_DISTRICTS,
  RETRIEVE_DISTRICTS,
  UPDATE_DISTRICTS,
  DELETE_DISTRICTS,
} from "../actions/type";
const initialState = [];
function DistrictsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_DISTRICTS:
      return {data: [...state.data], payload};
    case RETRIEVE_DISTRICTS:
      state = (payload.error == 1)?initialState:payload;
      // Object.assign(state,payload);
      // console.log("state", {data: [...state], payload});
      return {data: [...state], payload};
      // return {data: [...state], payload};
    case UPDATE_DISTRICTS:
      return {data: [...state.data], payload};
    case DELETE_DISTRICTS:
      return {data: [...state.data], payload};
    default:
      return state;
  }
};
export {DistrictsReducer};