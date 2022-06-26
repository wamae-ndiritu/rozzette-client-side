import {
  LIST_SETTINGS_REQUEST,
  LIST_SETTINGS_SUCCESS,
  LIST_SETTINGS_FAIL,
} from "../Constants/settingsConstants";

export const settingsListReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_SETTINGS_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case LIST_SETTINGS_SUCCESS:
      return {
        loading: false,
        settings: action.payload,
      };
    case LIST_SETTINGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
