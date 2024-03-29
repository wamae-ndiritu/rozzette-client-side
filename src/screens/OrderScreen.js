import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../Redux/Actions/OrderActions";
import Loading from "./../components/LoadingError/Loading";
import Message from "./../components/LoadingError/Error";
import mpesa from "../Images/mpesa-log.jpg";
import moment from "moment";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!order) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order]);

  // console.log(order?.orderItems);
  const title = "Your Order";
  useEffect(() => {
    document.title = `Rozzette | ${title}`;
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Customer</strong>
                    </h5>
                    <p>{order.user.name}</p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
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
                    <p>Shipping: {order.shippingAddress.country}</p>
                    <p>Payment:</p>{" "}
                    {order.paymentMethod === "Lipa Na Mpesa" && (
                      <img src={mpesa} alt="" style={{ marginBottom: "4px" }} />
                    )}
                    {order.isPaid ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Paid on {moment(order.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div
                          className="bg-danger p-2 col-12 d-flex justify-content-center"
                          style={{ marginTop: "10px" }}
                        >
                          <p className="text-white text-center text-sm-start">
                            Till NO:{" "}
                            <span
                              style={{
                                color: "black",
                                fontSize: "18px",
                              }}
                            >
                              5882195
                            </span>
                          </p>
                        </div>
                      </>
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
                      Address: {order.shippingAddress.city},{" "}
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                    {order.isDelivered ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Delivered on {moment(order.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Not Delivered
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your order is empty
                  </Message>
                ) : (
                  <>
                    {!order.isPaid && (
                      <Message variant="alert-info mt-5">
                        !Please note that once you have made your payment
                        through mpesa, our systems will only update once your
                        order has been delivered or collected.
                      </Message>
                    )}
                    {order.orderItems.map((item, index) => (
                      <div className="order-product row" key={index}>
                        <div className="col-md-3 col-6">
                          <img src={item.image} alt={item.productName} />
                        </div>
                        <div
                          className="col-md-5 col-6 d-flex align-items-center"
                          style={{ flexDirection: "column" }}
                        >
                          <Link
                            to={`/products/${item.product}`}
                            className="mb-2"
                          >
                            <h6>{item.productName}</h6>
                          </Link>
                          <div className="d-flex justify-content-center align-items-center">
                            Size {item.size}
                            <div
                              style={{
                                background: `${item.color}`,
                                marginLeft: "5px",
                                height: "20px",
                                width: "20px",
                                borderRadius: "50%",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
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
                      <td>Ksh {order.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>Ksh {order.shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax</strong>
                      </td>
                      <td>Ksh {order.taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>Ksh {order.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                <div
                  className="bg-danger p-2 col-12 d-flex justify-content-center"
                  style={{ marginTop: "5px", marginBottom: "10px" }}
                >
                  <p className="text-white text-center text-sm-start">
                    Pay Order{" "}
                    <span
                      style={{
                        color: "black",
                        fontSize: "18px",
                      }}
                    >
                      Ksh {order.totalPrice}
                    </span>
                  </p>
                </div>
                {/*!order.isPaid && (
                  <div className="col-12">
                    {loadingPay && <Loading />}
                    {!sdkReady ? (
                      <Loading />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </div>
                )*/}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderScreen;
