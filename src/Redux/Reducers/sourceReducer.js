import {
  GET_SOURCES_REQUEST,
  GET_SOURCES_SUCCESS,
  GET_SOURCES_FAIL,
} from "../Constants/sourceConstants";

// GET SOURCES
export const listSourcesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SOURCES_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case GET_SOURCES_SUCCESS:
      return {
        loading: false,
        sources: action.payload,
      };
    case GET_SOURCES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
