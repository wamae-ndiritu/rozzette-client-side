import {
  PAYMENT_VERIFICATION_REQUEST,
  PAYMENT_VERIFICATION_SUCCESS,
  PAYMENT_VERIFICATION_FAIL,
  MAKE_ORDER_ISPAID_REQUEST,
  MAKE_ORDER_ISPAID_SUCCESS,
  MAKE_ORDER_ISPAID_FAIL,
} from "../Constants/PaymentConstants";

// PAYMENT VERIFICATION
export const paymentVerificationReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_VERIFICATION_REQUEST:
      return { loading: true };
    case PAYMENT_VERIFICATION_SUCCESS:
      return { loading: false, paymentInfo: action.payload };
    case PAYMENT_VERIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//MAKE ORDER ISPAID
export const makeOrderIsPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_ORDER_ISPAID_REQUEST:
      return { loading: true };
    case MAKE_ORDER_ISPAID_SUCCESS:
      return { loading: false, orderInfo: action.payload };
    case MAKE_ORDER_ISPAID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
