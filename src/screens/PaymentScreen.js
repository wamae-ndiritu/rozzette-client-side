import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import mpesa from "../Images/mpesa-log.jpg";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Lipa Na Mpesa");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  const title = "Payment Methods";
  useEffect(() => {
    document.title = `Rozzette | ${title}`;
  }, []);
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center cent">
        <form className="Login2 col-md-8 col-lg-6" onSubmit={submitHandler}>
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <img src={mpesa} className="form-check-label" alt="" />
            </div>
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default PaymentScreen;
