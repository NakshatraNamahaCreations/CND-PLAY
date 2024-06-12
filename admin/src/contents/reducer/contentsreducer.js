

import {
  CREATE_CONTENTS,
  RETRIEVE_CONTENTS,
  UPDATE_CONTENTS,
  DELETE_CONTENTS,
} from "../actions/type";

const initialState = {
  data: [],
};

function ContentsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CONTENTS:
      return {
        ...state,
        data: [...state.data, payload],
      };

    case RETRIEVE_CONTENTS:
      return {
        ...state,
        data: payload.error === 1 ? [] : payload,
      };

    case UPDATE_CONTENTS:
      return {
        ...state,
        data: state.data.map((content) =>
          content.id === payload.data.id ? payload.data : content
        ),
      };

    case DELETE_CONTENTS:
      return {
        ...state,
        data: state.data?.filter((content) => content.id !== payload.id),
      };

    default:
      return state;
  }
}

export { ContentsReducer };
