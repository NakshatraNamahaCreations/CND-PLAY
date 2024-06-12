import {
  CREATE_EPISODES,
  RETRIEVE_EPISODES,
  UPDATE_EPISODES,
  DELETE_EPISODES,
} from "../actions/type";
const initialState = [];
function EpisodesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_EPISODES:
      return {data: [...state.data], payload};
    case RETRIEVE_EPISODES:
      state = (payload.error == 1)?initialState:payload;
      // Object.assign(state,payload);
      // console.log("state", {data: [...state], payload});
      return {data: [...state], payload};
      // return {data: [...state], payload};
    case UPDATE_EPISODES:
      return {data: [...state.data], payload};
    case DELETE_EPISODES:
      return {data: [...state.data], payload};
    default:
      return state;
  }
};
export {EpisodesReducer};