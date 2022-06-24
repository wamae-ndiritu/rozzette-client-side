import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Message from "./../components/LoadingError/Error";
import mpesa from "../Images/mpesa-log.jpg";

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const placeOrderHandler = () => {
    history.push("/payments/lipa-na-mpesa");
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: {cart.shippingAddress.country}</p>
                {<p>Shipping Time: </p>}
                <p>Payment:</p>{" "}
                {cart.paymentMethod === "Lipa Na Mpesa" && (
                  <img src={mpesa} alt="" />
                )}
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div
                    className="order-product row d-flex align-items-center"
                    key={index}
                  >
                    <div className="col-md-3 col-6 order-img">
                      <img src={item.image} alt={item.productName} />
                    </div>

                    <div className="col-md-5 col-6 d-flex align-items-center ord-info">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.productName}</h6>
                      </Link>
                      <div className="d-flex justify-content-center align-items-center">
                        <p>Size {item.size}</p>{" "}
                        <div
                          style={{
                            height: "20px",
                            width: "20px",
                            borderRadius: "50%",
                            margin: "7px",
                            background: item.color,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-4  d-flex align-items-center flex-column justify-content-center ">
                      <h4>QUANTITY</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SUBTOTAL</h4>
                      <h6>Ksh {item.qty * item.price}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>Ksh {cart.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>Ksh {cart.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>Ksh {cart.taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>Ksh {cart.totalPrice}</td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                Pay Ksh {amountPayable}
              </button>
            )}
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default PlaceOrderScreen;
