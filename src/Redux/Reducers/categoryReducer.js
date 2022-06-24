import {
  LIST_CATEGORIES_REQUEST,
  LIST_CATEGORIES_SUCCESS,
  LIST_CATEGORIES_FAIL,
} from "../Constants/categoryConstants";

export const listCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_CATEGORIES_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case LIST_CATEGORIES_SUCCESS:
      return {
        loading: false,
        error: false,
        categories: action.payload,
      };
    case LIST_CATEGORIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
