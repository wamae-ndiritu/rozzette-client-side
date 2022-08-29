import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Email from "@mui/icons-material/Email";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-con">
      <div className="footer-row">
        <div className="col">
          <h1>Rozzette</h1>
        </div>
        <div className="col">
          <p>fashion clothing</p>
          <p>utensils</p>
          <p>school gear</p>
        </div>
        <div className="col">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/login">
            <p>Login</p>
          </Link>
          <Link to="/register">
            <p>Register</p>
          </Link>
        </div>
        <div className="col">
          <h1>Contacts</h1>
          <ul className="contact-row">
            <li>
              <a
                href="https://www.facebook.com/Rozzette19/"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon style={{ color: "#fff", fontSize: "22px" }} />
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/254725904276"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon
                  style={{
                    fontSize: "22px",
                    color: "#fff",
                  }}
                />
              </a>
            </li>
            <li>
              <a href="mailto:info@rozzette.com">
                <Email
                  style={{
                    fontSize: "22px",
                    color: "#fff",
                  }}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <hr />
        <p>&copy; Rozzette {currentYear}</p>
      </div>
    </div>
  );
};

export default Footer;
