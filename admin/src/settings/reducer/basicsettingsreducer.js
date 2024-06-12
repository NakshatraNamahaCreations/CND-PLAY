import {
  CREATE_BASIC_SETTINGS,
  RETRIEVE_BASIC_SETTINGS,
  UPDATE_BASIC_SETTINGS,
  DELETE_BASIC_SETTINGS,
} from "../actions/type";
const initialState = [];
function BasicSettingsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BASIC_SETTINGS:
      return {data: [...state.data], payload};
    case RETRIEVE_BASIC_SETTINGS:
      state = (payload.error == 1)?initialState:payload;
      // Object.assign(state,payload);
      // console.log("state", {data: [...state], payload});
      return {data: [...state], payload};
      // return {data: [...state], payload};
    case UPDATE_BASIC_SETTINGS:
      return {data: [...state.data], payload};
    case DELETE_BASIC_SETTINGS:
      return {data: [...state.data], payload};
    default:
      return state;
  }
};
export {BasicSettingsReducer};