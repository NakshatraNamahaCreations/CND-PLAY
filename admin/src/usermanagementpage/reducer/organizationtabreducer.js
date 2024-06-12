import {
  CREATE_ORGANIZATION,
  RETRIEVE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,
} from "../actions/type";
const initialState = [];
function OrganizationTabReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ORGANIZATION:
      return {data: [...state.data], payload};
    case RETRIEVE_ORGANIZATION:
      state = (payload.error == 1)?initialState:payload;
      return {data: [...state], payload};
    case UPDATE_ORGANIZATION:
      return {data: [...state.data], payload};
    case DELETE_ORGANIZATION:
      return {data: [...state.data], payload};
    default:
      return state;
  }
};
export {OrganizationTabReducer};