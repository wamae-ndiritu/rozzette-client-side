import React from "react";
import lipaNaMpesa from "../../Images/lipa-na-mpesa.jpg";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>Call Us</h5>
            <p>0725 904 276</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>Pick Up Shop</h5>
            <p>Ebrahim Shopping Mall,</p>
            <p>
              2<sup>nd</sup> Floor, Shop K8
            </p>
            <p>Along Moi Avenue, Nairobi</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <img
                src={lipaNaMpesa}
                alt="lipa na mpesa"
                className="lipa-mpesa"
              />
            </div>
            <h5>Pay Method</h5>
            <p>
              Mpesa Till No <span style={{ color: "red" }}>5882195</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
