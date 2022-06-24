import {
  GET_SOURCES_REQUEST,
  GET_SOURCES_SUCCESS,
  GET_SOURCES_FAIL,
} from "../Constants/sourceConstants";
import axios from "axios";
import { URL } from "../../url.js";
import { logout } from "./userActions.js";

//GET SOURCES
export const listSources = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SOURCES_REQUEST });

    const { data } = await axios.get(`${URL}/api/source//client-side-all`);

    dispatch({ type: GET_SOURCES_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: GET_SOURCES_FAIL, payload: message });
  }
};
