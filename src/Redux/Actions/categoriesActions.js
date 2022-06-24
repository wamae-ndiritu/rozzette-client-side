import axios from "axios";
import { URL } from "../../url";
import {
  LIST_CATEGORIES_REQUEST,
  LIST_CATEGORIES_SUCCESS,
  LIST_CATEGORIES_FAIL,
} from "../Constants/categoryConstants";

// GET CATEGORIES
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_CATEGORIES_REQUEST });

    const { data } = await axios.get(`${URL}/api/category/client-side/all`);

    dispatch({ type: LIST_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
