import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { payOrder } from "../Redux/Actions/OrderActions";
import mpesa from "../Images/mpesa-log.jpg";

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
      <div className="container mt-5 mb-4 d-flex justify-content-center">
        <div className="col-md-6 col-lg-6 col-12 shadow-lg">
          {loading ? (
            <Loading />
          ) : (
            error && (
              <div className="d-flex justify-content-center mt-3">
                <Message variant="alert-danger" className="col-4">
                  {error}
                </Message>
              </div>
            )
          )}
          <div className="text-center my-3 mpesa-page-title">
            <h6>Make Payment</h6>
          </div>
          <div className="row mb-4 mx-3">
            <div className="col-6">
              <p className="gray-para">
                A prompt will be sent on your phone requesting you to enter your
                mpesa pin.
              </p>
              <p className="gray-para">Enter your pin and click okay to pay.</p>
              <p className="gray-para">
                Wait for the confirmation message and proceed to verifying your
                payment.
              </p>
            </div>
            <form className="col-6 mpesa-form">
              <div className="mpesa-title">
                <img src={mpesa} alt="mpesa" />
              </div>
              <div className="mpesa-input">
                <label>ENTER MOBILE NO</label>
                <input
                  type="number"
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="254712345678"
                />
              </div>
              <p>Amount: Ksh {amountPayable}</p>
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
