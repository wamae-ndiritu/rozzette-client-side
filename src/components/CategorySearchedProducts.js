import React, { useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Rating from "./homeComponents/Rating";
import Pagination from "./homeComponents/pagination";

const CategorySearchedProducts = ({ category }) => {
  const categoryProducts = useSelector((state) => state.categoryProducts);
  const { products, page, pages } = categoryProducts;

  useEffect(() => {
    if ($(window).innerWidth() <= 768) {
      $("#search-small-cont").removeClass("mx-4");
    }

    if ($(window).innerWidth() <= 400) {
      $(".mobile-filter-product-id").removeClass("col-3");
      $(".mobile-filter-product-id").addClass("col-4");
      if ($(".mobile-filter-product-id").hasClass("col-4")) {
        console.log("col-4 was added to classLists");
      }
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row mx-4" id="search-small-cont">
        {products?.map((product) => (
          <div
            className="border-product col-lg-3 col-md-4 col-sm-4 col-3 mb-4 filt-product-height mobile-filter-product-id"
            key={product._id}
          >
            <Link to={`/products/${product._id}`}>
              <div className="shopBack">
                <img src={product.image} alt={product.productName} />
              </div>
            </Link>
            <div className="shoptext">
              <p>
                <Link
                  to={`/products/${product._id}`}
                  className="title-small title-name"
                >
                  {product.productName}
                </Link>
              </p>

              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <h3 className="headers-small">Ksh {product.price}</h3>
              <div className="my-3">
                <Link to={`/products/${product._id}`}>
                  <button
                    className="btn d-flex align-items-center"
                    style={{
                      backgroundColor: "orange",
                      padding: "2px",
                      fontSize: ".7rem",
                    }}
                  >
                    VIEW DETAILS
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        pages={pages}
        page={page}
        category={category ? category : ""}
      />
    </div>
  );
};

export default CategorySearchedProducts;
