import {
  CREATE_INDIE_MOVIE,
  RETRIEVE_INDIE_MOVIE,
  UPDATE_INDIE_MOVIE,
  DELETE_INDIE_MOVIE,
} from "../actions/type";
const initialState = [];
function IndieMovieReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_INDIE_MOVIE:
      return {
        ...state,
        data: [...state.data, payload],
      };

    case RETRIEVE_INDIE_MOVIE:
      return {
        ...state,
        data: payload.error === 1 ? [] : payload,
      };

    case UPDATE_INDIE_MOVIE:
      return { data: [...state.data], payload };
    case DELETE_INDIE_MOVIE:
      return { data: [...state.data], payload };
    default:
      return state;
  }
}
export { IndieMovieReducer };
