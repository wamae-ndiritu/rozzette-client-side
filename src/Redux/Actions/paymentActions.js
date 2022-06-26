import {
  PAYMENT_VERIFICATION_REQUEST,
  PAYMENT_VERIFICATION_SUCCESS,
  PAYMENT_VERIFICATION_FAIL,
  MAKE_ORDER_ISPAID_REQUEST,
  MAKE_ORDER_ISPAID_SUCCESS,
  MAKE_ORDER_ISPAID_FAIL,
} from "../Constants/PaymentConstants";
import axios from "axios";
import { URL } from "../../url.js";

// PAYNMENT VERIFICATION
export const verifyMpesaCode =
  (mpesaCode, amountPayable) => async (dispatch) => {
    try {
      dispatch({ type: PAYMENT_VERIFICATION_REQUEST });

      const { data } = await axios.post(
        `${URL}/api/verify-payment/mpesa-code-verification`,
        { mpesaCode, amountPayable }
      );
      //console.log(mpesaReceiptNumber);
      dispatch({ type: PAYMENT_VERIFICATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PAYMENT_VERIFICATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//MAKE ORDER IS PAID
export const makeOrderIsPaid = (id) => async (dispatch) => {
  try {
    dispatch({ type: MAKE_ORDER_ISPAID_REQUEST });

    const { data } = await axios.put(
      `${URL}/api/verify-payment/${id}/orderIsPaid`
    );
    dispatch({ type: MAKE_ORDER_ISPAID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MAKE_ORDER_ISPAID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
