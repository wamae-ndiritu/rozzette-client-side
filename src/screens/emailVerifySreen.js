import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { verifyOTP } from "../Redux/Actions/userActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

const EmailVerificationScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [verifyCode, setVerifyCode] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { status } = userRegister;

  const otpVerification = useSelector((state) => state.otpVerification);
  const { loading, error, userInfo } = otpVerification;

  useEffect(() => {
    if (userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = status && status._id;
    dispatch(verifyOTP(userId, verifyCode));
  };
  return (
    <>
      <Header />
      <div className="status-container">
        <div className="message-cont-wrapper">
          {loading ? (
            <Loading />
          ) : (
            error && <Message variant="alert-danger">{error}</Message>
          )}
          <form onSubmit={handleSubmit} class="content-area">
            <h4>Verify your Account</h4>
            <p>Please enter the 6-character code sent to your email.</p>
            <fieldset class="number-code">
              <legend>OTP</legend>
              <div>
                <input
                  name="code"
                  class="code-input"
                  required
                  maxLength="6"
                  onChange={(e) => setVerifyCode(e.target.value)}
                />
              </div>
            </fieldset>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationScreen;
