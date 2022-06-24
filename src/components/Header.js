import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
const Header = () => {
  const [keyword, setKeyword] = useState();
  const [isHidden, setIsHidden] = useState(true);
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

  useEffect(() => {
    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  $("[data-trigger]").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    //var offcanvas_id = $(this).attr("data-trigger");
    //const iconElement = document.getElementById("offcanvas_aside");
    if (isHidden) {
      $("#offcanvas_aside").removeClass("categ-con");
      setIsHidden(false);
    } else {
      $("#offcanvas_aside").removeClass("show-menu");
      setIsHidden(true);
    }
    //$(offcanvas_id).toggleClass("show");
  });

  return (
    <div className="sticky-header">
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <h1>Rozzette</h1>
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-space-between Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          <i class="fa fa-user"></i> Profile
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          <i class="fa fa-sign-out"></i> Logout
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
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          <i class="fa fa-sign-in"></i> Login
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          <i class="fa fa-user-plus"></i> Register
                        </Link>
                      </div>
                    </div>
                  )}
                  <Link to="/cart">
                    <AddShoppingCartOutlinedIcon style={{ fontSize: "20px" }} />
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center ">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
                <div className="menu-icon">
                  <button
                    className="btn btn-icon btn-mobile me-auto"
                    data-trigger="#offcanvas_aside"
                  >
                    <i className="md-28 fas fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <h1>Rozzette</h1>
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    <i class="fa fa-search"></i> search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
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
                        <i class="fa fa-user"></i> Profile
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        <i class="fa fa-sign-out"></i> Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register" className="signing-container">
                      <i class="fa fa-user-plus iconn"></i>
                      <p>Register</p>
                    </Link>
                    <Link to="/login" className="signing-container">
                      <i class="fa fa-sign-in iconn"></i>
                      <p>Login</p>
                    </Link>
                  </>
                )}

                <Link to="/cart">
                  <AddShoppingCartOutlinedIcon style={{ fontSize: "30px" }} />
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
