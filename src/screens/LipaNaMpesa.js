import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { payOrder } from "../Redux/Actions/OrderActions";

const LipaNaMpesaScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const [phoneNo, setPhoneNo] = useState("");

  const orderPay = useSelector((state) => state.orderPay);
  const { loading, error, success } = orderPay;

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
  const paymentDetails = { phoneNo, amountPayable };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNo) {
      dispatch(payOrder(paymentDetails));
    }
  };

  useEffect(() => {
    if (success) {
      history.push("/payments/lipa-na-mpesa-code/verification");
    }
  }, [history, success]);

  const title = "Payments";
  useEffect(() => {
    document.title = `Rozzette | ${title}`;
  }, []);

  return (
    <>
      <Header />
      <div className="payment-container">
        {loading ? (
          <Loading />
        ) : (
          error && <Message variant="alert-danger">{error}</Message>
        )}
        <div className="payment-wrapper alert-success">
          <div className="mpesa-col-1">
            <h6>Make Payment</h6>
          </div>
          <div className="mpesa-col-2">
            <div className="payment-info">
              <p>
                A prompt will be sent on your phone requesting you to enter your
                mpesa pin. <br /> Enter your pin and click okay to pay.
              </p>
            </div>
            <form className="mpesa-container col-md-8 col-lg-4 col-11">
              <div className="mpesa-title">
                <h6>Lipa Na Mpesa</h6>
              </div>
              <div className="mpesa-input">
                <label>Mpesa No:</label>
                <input
                  type="number"
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="254712345678"
                />
              </div>
              <div className="mpesa-input">Amount: Ksh {amountPayable}</div>
              <div className="mpesa-input">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mpesa-btn"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default LipaNaMpesaScreen;
