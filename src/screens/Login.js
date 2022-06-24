import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { login } from "./../Redux/Actions/userActions";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  //const otpVerification = useSelector((state) => state.otpVerification);
  //const { userInfo: regLogin } = otpVerification;

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const toggleEye = () => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Header />
      <div className=" large-cont container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="d-flex pass-input">
            <input
              type={isClicked ? "text" : "password"}
              className="in-pass"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fa fa-eye fa-pass" onClick={toggleEye}></i>
          </div>
          <button type="submit">Login</button>
          <div className="d-flex .fle-row">
            <p>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Forgot password?
              </Link>
            </p>
            <p>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
