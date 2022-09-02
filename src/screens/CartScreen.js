import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "./../Redux/Actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const title = "Cart";
  useEffect(() => {
    document.title = `Rozzette | ${title}`;
  }, []);

  const productId = match.params.id;
  const qty = location.search
    ? Number(location.search.split("qty=")[1].split("&")[0])
    : 1;

  const [quantity, setQuantity] = useState(qty);

  const size = location.search
    ? location.search.split("size=")[1].split("&")[0]
    : "";
  const color = location.search ? location.search.split("color=")[1] : "";

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size, color));
    }
  }, [dispatch, productId, qty, size, color]);

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const handleQuantity = (item, type) => {
    if (type === "inc") {
      setQuantity((quantity) => quantity + 1);
      console.log(quantity);
      const id = item.product;
      const qty = quantity;
      console.log(qty);
      dispatch(addToCart(id, qty));
    }
    if (type === "dec") {
      if (quantity > 1) {
        setQuantity((quantity) => quantity - 1);
      } else {
        return;
      }
    }
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container cart-container shadow-sm">
        {cartItems.length === 0 ? (
          <div className="d-flex flex-column justify-content-center alert alert-info text-center empty-cart">
            <p className="text-danger my-3">Oops! your cart is empty</p>
            <i
              className="fa fa-shopping-cart mb-3"
              style={{ color: "#222", fontSize: "54px" }}
            ></i>
            <Link
              className="btn btn-search mx-5 px-5 py-3 mb-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className="alert alert-info text-center mt-4">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems?.map((item, index) => (
              <div key={index}>
                <div className="row d-flex align-items-centerpy-4">
                  <div className="cart-image col-md-3 col-5 mb-4">
                    <img src={item.image} alt={item.productName} />
                  </div>
                  <div className="cart-text col-md-5 col-5 mb-4 d-flex align-items-center">
                    <Link to={`/products/${item.product}`}>
                      <h4>{item.productName}</h4>
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
                    <div
                      onClick={() => removeFromCartHandle(item.product)}
                      className="remove-button d-flex justify-content-center align-items-center"
                    >
                      <p style={{ color: "red" }}>Remove</p>
                    </div>
                  </div>
                  <div className="cart-qty col-md-2 col-sm-5 mb-4 col-5 d-flex flex-column justify-content-center">
                    <h6>QUANTITY</h6>
                    <div className="d-flex align-items-center">
                      <div
                        className="btn-qty"
                        onClick={() => handleQuantity(item, "dec")}
                      >
                        <i class="fa fa-minus"></i>
                      </div>
                      <p style={{ fontSize: "16px" }}>{quantity}</p>
                      <div
                        className="btn-qty"
                        onClick={() => handleQuantity(item, "inc")}
                      >
                        <i class="fa fa-plus"></i>
                      </div>
                    </div>

                    {/* <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                      className="cart-qty-input"
                    /> */}
                  </div>
                  <div className="cart-price col-md-2 col-6 mb-5 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                    <h6>PRICE</h6>
                    <h4>Ksh {item.price}</h4>
                  </div>
                </div>
                <div className="cart-hr">
                  <hr />
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">total:</span>
              <span className="total-price">Ksh {total}</span>
            </div>
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Continue To Shopping</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartScreen;
