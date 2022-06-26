import axios from "axios";
import { URL } from "../../url";
import {
  LIST_SETTINGS_REQUEST,
  LIST_SETTINGS_SUCCESS,
  LIST_SETTINGS_FAIL,
} from "../Constants/settingsConstants";

// GET SETTINGS
export const getSettings = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_SETTINGS_REQUEST });

    const { data } = await axios.get(`${URL}/api/settings/`);

    dispatch({ type: LIST_SETTINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LIST_SETTINGS_FAIL, payload: error });
  }
};
