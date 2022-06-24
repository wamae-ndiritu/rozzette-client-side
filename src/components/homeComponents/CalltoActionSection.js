import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSubscriber } from "../../Redux/Actions/mailActions.js";

const CalltoActionSection = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(createSubscriber(email));
      setEmail("");
    }
  };

  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>DO you need more tips?</h2>
              <p>Sign up free and get the latest tips.</p>
              <form className="form-section" onSubmit={handleSubmit}>
                <input
                  placeholder="Your Email..."
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input value="Yes. I want!" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
