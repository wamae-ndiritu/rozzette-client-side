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
            <h5>Nairobi</h5>
            <p>Pick Up Shop</p>
            <p>Ebrahim Shopping Mall,</p>
            <p>Along Moi Avenue,</p>
            <p>
              2<sup>nd</sup> Floor,
            </p>
            <p>Shop K8</p>
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
            <p>Mpesa</p>
            <p>Till No: 5882195</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
