import {
  CREATE_VIDEOS,
  RETRIEVE_VIDEOS,
  UPDATE_VIDEOS,
  DELETE_VIDEOS,
} from "../actions/type";
const initialState = [];
function VideosReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_VIDEOS:
      return {data: [...state.data], payload};
    case RETRIEVE_VIDEOS:
      state = (payload.error == 1)?initialState:payload;
      // Object.assign(state,payload);
      // console.log("state", {data: [...state], payload});
      return {data: [...state], payload};
      // return {data: [...state], payload};
    case UPDATE_VIDEOS:
      return {data: [...state.data], payload};
    case DELETE_VIDEOS:
      return {data: [...state.data], payload};
    default:
      return state;
  }
};
export {VideosReducer};