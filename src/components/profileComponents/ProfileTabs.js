import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./../LoadingError/Toast";
import Loading from "./../LoadingError/Loading";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/userActions";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading, userInfo: updatedUser } = userUpdateProfile;

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }

    if (updatedUser) {
      setName(updatedUser.name);
      setEmail(updatedUser.email);
    }
  }, [dispatch, userInfo, updatedUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Password match
    if (password) {
      if (password !== confirmPassword) {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(
            "Password does not match",
            Toastobjects
          );
        }
      } else {
        dispatch(updateUserProfile({ id: userInfo._id, name, password }));
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Profile Updated", Toastobjects);
        }
      }
    }
  };
  return (
    <>
      <Toast />
      {/*error && <Message variant="alert-danger">{error}</Message>*/}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input
              className="form-control"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
