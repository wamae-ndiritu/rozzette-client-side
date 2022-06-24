import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);

  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleColor = (value) => {
    setColor(value);
  };

  const AddToCartHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}&size=${size}&color=${color}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };

  const myRef = React.createRef();
  const handleTab = (colorImage, index) => {
    const image = document.getElementById("large-img");
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
    image.src = colorImage;
  };

  console.log();
  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6 image-details">
                <div className="single-image" style={{ background: "#f3f3f3" }}>
                  <img src={product.image} alt={product.name} id="large-img" />
                </div>
                <div className="thumb" ref={myRef}>
                  {product.image?.length > 1 &&
                    product.image?.map((colorImage, index) => (
                      <img
                        src={colorImage}
                        alt=""
                        key={index}
                        onClick={() => handleTab(colorImage, index)}
                      />
                    ))}
                </div>
                <div className="filter-wrapper">
                  <div className="column-2">
                    <h4 className="my-4">Colors</h4>
                    <div className="image-colors">
                      {product.productColors?.map((color) => (
                        <button
                          className="col-btn"
                          key={color}
                          style={{ background: color, cursor: "pointer" }}
                          onClick={() => handleColor(color)}
                        ></button>
                      ))}
                    </div>
                  </div>
                  <div className="column-1">
                    <h4 className="my-4">Sizes</h4>
                    <select onChange={handleSize} className="size-select">
                      <option default>--select--</option>
                      {product?.productSize?.length > 0 &&
                        product?.productSize?.map((size) => (
                          <option value={size} key={size}>
                            {size}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.productName}</div>
                  </div>
                  <div className="description">
                    <p>{product.description}</p>
                  </div>
                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Price</h6>
                      <span>Ksh {product.price}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {product.inStock ? (
                        <span>In Stock</span>
                      ) : (
                        <span>For Shipping</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reviews</h6>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>
                    <>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Quantity</h6>
                        <input
                          type="number"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          style={{ width: "40px", maxWidth: "3" }}
                        />
                      </div>
                      <button
                        onClick={AddToCartHandle}
                        className="round-black-btn"
                      >
                        Add To Cart
                      </button>
                    </>
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">REVIEWS</h6>
                {product.reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>No Reviews</Message>
                )}
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>WRITE A CUSTOMER REVIEW</h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">
                      {errorCreateReview}
                    </Message>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>Rating</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comment</strong>
                      <textarea
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Please{" "}
                      <Link to="/login">
                        " <strong>Login</strong> "
                      </Link>{" "}
                      to write a review{" "}
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;