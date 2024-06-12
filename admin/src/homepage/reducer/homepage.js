import {
    CREATE_UNKNOWN_TOPIC,
    RETRIEVE_UNKNOWN_TOPICS,
    UPDATE_UNKNOWN_TOPIC,
    DELETE_UNKNOWN_TOPIC,
    DELETE_ALL_UNKNOWN_TOPICS,
  } from "../actions/type";
  const initialState = [];
  function HomepageReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_UNKNOWN_TOPIC:
        return [...state, payload];
      case RETRIEVE_UNKNOWN_TOPICS:
        return payload;
      case UPDATE_UNKNOWN_TOPIC:
        return state.map((value) => {
          if (value.id === payload.id) {
            return {
              ...value,
              ...payload,
            };
          } else {
            return value;
          }
        });
      case DELETE_UNKNOWN_TOPIC:
        return state.filter(({ id }) => id !== payload.id);
      case DELETE_ALL_UNKNOWN_TOPICS:
        return [];
      default:
        return state;
    }
  };
  export {HomepageReducer};