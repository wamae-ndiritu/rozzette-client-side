import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../Redux/Actions/OrderActions";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import {
  verifyMpesaCode,
  makeOrderIsPaid,
} from "../Redux/Actions/paymentActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";

const PaymentVericationScreen = ({ history }) => {
  const [mpesaCode, setMpesaCode] = useState("");
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice < 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const amountPayable = Number(Math.round(cart.totalPrice));

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  const paymentVerification = useSelector((state) => state.paymentVerification);
  const { loading, error, paymentInfo } = paymentVerification;

  const submitHandler = (e) => {
    e.preventDefault();
    if (mpesaCode) {
      dispatch(verifyMpesaCode(mpesaCode, amountPayable));
    }
  };

  const orderItems = cart.cartItems;
  const shippingAddress = cart.shippingAddress;
  const paymentMethod = cart.paymentMethod;
  const itemsPrice = cart.itemsPrice;
  const shippingPrice = cart.shippingPrice;
  const taxPrice = cart.taxPrice;
  const totalPrice = amountPayable;

  useEffect(() => {
    if (paymentInfo) {
      dispatch(
        createOrder({
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        })
      );
      if (success) {
        dispatch(makeOrderIsPaid(order._id));
        history.push(`/order/${order._id}`);
        dispatch({ type: ORDER_CREATE_RESET });
      }
    }
  }, [
    history,
    success,
    dispatch,
    order,
    paymentInfo,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  ]);

  return (
    <>
      <Header />
      <div className="payment-container">
        {loading ? (
          <Loading />
        ) : (
          error && <Message variant="alert-danger">{error}</Message>
        )}
        <div className="payment-ver-cont">
          <div className="ver-wrapper alert-success">
            <div className="ver-title">
              <h6>Verify Payment</h6>
            </div>
            <div className="ver-body">
              <div className="ver-col-1">
                <p>
                  Enter the Mpesa Code received from Safaricom Mpesa for
                  confirmation.
                </p>
              </div>
              <div className="ver-col-2">
                <div className="code-btn">MPESA CODE</div>
                <input
                  type="text"
                  placeholder="QEV5XPAKEX"
                  onChange={(e) => setMpesaCode(e.target.value)}
                />
              </div>
            </div>
            <div className="btn-cont">
              <button
                type="submit"
                className="verify-btn"
                onClick={submitHandler}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default PaymentVericationScreen;
