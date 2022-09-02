import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/userActions";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, status } = userRegister;

  useEffect(() => {
    if (status) {
      history.push("/register/status");
    }
  }, [status, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === password1) {
      dispatch(register(name, email, password));
    }
  };

  const title = "Sign Up";
  useEffect(() => {
    document.title = `Rozzette | ${title}`;
  }, []);

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}

        <form
          className="Login col-md-6 col-lg-6 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            <i
              className={
                isClicked
                  ? `fa fa-eye fa-pass pass-check`
                  : `fa fa-eye-slash fa-pass pass-check`
              }
              onClick={() => setIsClicked(!isClicked)}
            ></i>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />

          <button type="submit">Register</button>
          <div className="d-flex fle-row"></div>
          <p>
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="red-link-cont"
            >
              I Have Account <strong className="red-link">Login</strong>
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
