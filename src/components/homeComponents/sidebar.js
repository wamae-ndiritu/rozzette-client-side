import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import Email from "@mui/icons-material/Email";

const CategorySideBar = () => {
  const listCategories = useSelector((state) => state.listCategories);
  const { categories } = listCategories;

  return (
    <>
      <div className="container categ-con" id="offcanvas_aside">
        <div className="categ">
          <div className="d-flex justify-content-center">
            <p className="filter-head-1">Categories</p>
          </div>
          {categories?.map((category) => (
            <div className="cat-link">
              <Link
                to={`/products/category/${category.categoryName}`}
                key={category._id}
              >
                <p>{category.categoryName}</p>
              </Link>
            </div>
          ))}
          <div className="col" style={{ marginTop: "20px" }}>
            <ul className="contact-row">
              <li>
                <a
                  href="https://www.facebook.com/Rozzette19/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon style={{ color: "blue", fontSize: "22px" }} />
                </a>
              </li>
              <li>
                <a href="">
                  <InstagramIcon
                    style={{
                      color: "purple",
                      fontSize: "22px",
                    }}
                  />
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
                      color: "#000000",
                    }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySideBar;
