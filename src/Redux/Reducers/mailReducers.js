import {
  CREATE_SUBSCRIBER_REQUEST,
  CREATE_SUBSCRIBER_SUCCESS,
  CREATE_SUBSCRIBER_FAIL,
} from "../Constants/mailConstatnts";

export const mailSubscriberReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBSCRIBER_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case CREATE_SUBSCRIBER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_SUBSCRIBER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
