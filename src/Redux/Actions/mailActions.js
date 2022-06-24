import {
  CREATE_SUBSCRIBER_REQUEST,
  CREATE_SUBSCRIBER_SUCCESS,
  CREATE_SUBSCRIBER_FAIL,
} from "../Constants/mailConstatnts";
import axios from "axios";
import { URL } from "../../url";

// CREATE A SUBSCRIBER
export const createSubscriber = (email) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SUBSCRIBER_REQUEST });

    await axios.post(`${URL}/api/mails/subscribe`, { email });

    dispatch({ type: CREATE_SUBSCRIBER_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_SUBSCRIBER_FAIL, error: message });
  }
};
