import React, { useState } from "react";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
// import rozzetteLogo from "../Images/Rozzette.png";
const Header = () => {
  const [keyword, setKeyword] = useState();
  const [isSearchHidden, setIsSearchHiden] = useState(true);
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword && keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  $(window).scroll(function () {
    // console.log($(this).scrollTop());
    if ($(this).scrollTop() > 250) {
      $("#top").addClass("sticky-header");
      $("#top").removeClass("mt-5");
    } else {
      $("#top").addClass("mt-5");
      $("#top").removeClass("sticky-header");
    }
  });

  return (
    <>
      {/* <div className="sticky-header"> */}
      {/* Header */}
      <div className="header shadow-lg mt-5" id="top">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row">
                {isSearchHidden ? (
                  <>
                    <div className="col-3 d-flex align-items-center justify-content-center">
                      <Link className="navbar-brand" to="/">
                        <h1>Rozzette</h1>
                        {/* <img src={rozzetteLogo} alt="Rozzette logo" /> */}
                      </Link>
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-center">
                      {userInfo ? (
                        <div className="btn-group">
                          <button
                            type="button"
                            className="name-button dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i
                              className="fas fa-user head-icons"
                              style={{ fontSize: "24px" }}
                            ></i>
                          </button>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/profile">
                              <i
                                className="fa fa-user head-icons"
                                style={{ fontSize: "24px" }}
                              ></i>{" "}
                              Profile
                            </Link>

                            <Link
                              className="dropdown-item"
                              to="#"
                              onClick={logoutHandler}
                            >
                              <i className="fa fa-sign-out head-icons"></i>{" "}
                              Logout
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="btn-group">
                          <button
                            type="button"
                            className="name-button dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i
                              className="fas fa-user head-icons"
                              style={{ fontSize: "24px" }}
                            ></i>
                          </button>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/login">
                              <i className="fa fa-sign-in head-icons"></i> Login
                            </Link>

                            <Link className="dropdown-item" to="/register">
                              <i
                                className="fa fa-user-plus head-icons"
                                style={{ fontSize: "24px" }}
                              ></i>{" "}
                              Sigh Up
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-center Login-Register">
                      <Link
                        to="/cart"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i
                          className="fa fa-cart-plus head-icons"
                          style={{ fontSize: "1.75rem" }}
                        ></i>
                        {cartItems.length > 0 && (
                          <span className="badge">{cartItems.length}</span>
                        )}
                        <p className="px-2">Cart</p>
                      </Link>
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-search"
                        onClick={() => setIsSearchHiden(!isSearchHidden)}
                      >
                        Search
                      </button>
                    </div>
                    {/* <SearchIcon style={{ color: "black" }} /> */}
                  </>
                ) : (
                  <div className="col-12 mb-3 d-flex align-items-center justify-content-center">
                    <form onSubmit={submitHandler} className="input-group">
                      <button type="submit" className="btn btn-search">
                        <i className="fa fa-search"></i>
                      </button>
                      <input
                        type="search"
                        className="search-input"
                        placeholder="Search product..."
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </form>
                    <div
                      className="d-flex align-items-center justify-content-center mt-4"
                      onClick={() => setIsSearchHiden(!isSearchHidden)}
                    >
                      <i className="fa fa-times"></i>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-2 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <h1>Rozzette</h1>
                  {/* <img src={rozzetteLogo} alt="Rozzette logo" /> */}
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search product..."
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="btn btn-search">
                    <i className="fa fa-search"></i> Search
                  </button>
                </form>
              </div>
              <div className="col-md-4 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        <i
                          className="fa fa-user head-icons"
                          style={{ fontSize: "24px" }}
                        ></i>{" "}
                        Profile
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        <i className="fa fa-sign-out head-icons"></i> Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register" className="signing-container">
                      <i className="fa fa-user-plus head-icons"></i>
                      <p className="px-2 header-titles">Sign Up</p>
                    </Link>
                    <Link to="/login" className="signing-container">
                      <i
                        className="fa fa-user head-icons"
                        style={{ fontSize: "24px" }}
                      ></i>
                      <p className="px-2 header-titles">Login</p>
                    </Link>
                  </>
                )}
                <Link
                  to="/cart"
                  className="d-flex align-items-center justify-content-center"
                >
                  <i
                    className="fa fa-cart-plus head-icons"
                    style={{ fontSize: "1.75rem" }}
                  ></i>
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                  <p className="px-2 header-titles">Cart</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Header;
