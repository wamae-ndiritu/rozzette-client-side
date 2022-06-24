import React, { useEffect, useState } from "react";
import Rating from "../components/homeComponents/Rating";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "@emotion/styled";
import {
  getPriceRange,
  listCategoryProducts,
} from "../Redux/Actions/ProductActions";
import Pagination from "../components/homeComponents/pagination";

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 7px;
  margin-top: 7px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const CategoryScreen = ({ match }) => {
  const categoryName = match.params.categoryName;
  const dispatch = useDispatch();

  const [price, setPrice] = useState([1, 1000]);
  const [color, setColor] = useState("");
  const [source, setSource] = useState("");

  const categoryProducts = useSelector((state) => state.categoryProducts);
  const { products, pages, page } = categoryProducts;

  const priceRange = useSelector((state) => state.priceRange);
  const { minPrice, maxPrice } = priceRange;

  const valuetext = (value) => {
    return `Ksh ${price}`;
  };

  const changePriceHandler = (e, value) => {
    setPrice(value);
  };

  const handleColor = (value) => {
    setColor(value);
  };

  const handleSource = (value) => {
    setSource(value);
  };

  useEffect(() => {
    dispatch(getPriceRange());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listCategoryProducts(categoryName, price, source, color));
  }, [dispatch, categoryName, price, source, color]);

  console.log(products);

  return (
    <>
      <Header />
      <div className="container category-page" style={{ marginTop: "20px" }}>
        <section className="search-fragment-cont">
          <div className="filters-cont col-4 col-md-6">
            <h5 className="filter-head">
              Price / Categories / Color / Filters
            </h5>
            <div className="category-header">
              <h5 className="filter-head">Price (Ksh)</h5>
            </div>
            <div className="px-6 slider-size">
              <Slider
                value={price}
                min={minPrice}
                max={maxPrice}
                onChange={changePriceHandler}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
              />
            </div>
            <section className="mb-4">
              <div className="category-header">
                <h5 className="filter-head">Sources</h5>
              </div>
              <div className="category-btn ">
                <div
                  className="cat-btn"
                  value="turkey"
                  onClick={() => handleSource("")}
                >
                  All
                </div>
                <div
                  className="cat-btn"
                  value="turkey"
                  onClick={() => handleSource("turkey")}
                >
                  Turkey
                </div>
                <div className="cat-btn" onClick={() => handleSource("china")}>
                  China
                </div>
                <div className="cat-btn" onClick={() => handleSource("dubai")}>
                  Dubai
                </div>
              </div>
            </section>
            <div className="mb-4">
              <div className="category-header">
                <h5 className="filter-head">Colors</h5>
              </div>
              <div className="category-btn">
                <div className="cat-btn" onClick={() => handleColor("")}>
                  All
                </div>
                <FilterColor
                  color="black"
                  value="black"
                  onClick={() => handleColor("black")}
                />
                <FilterColor color="red" onClick={() => handleColor("red")} />
                <FilterColor
                  color="yellow"
                  onClick={() => handleColor("yellow")}
                />
                <FilterColor color="blue" onClick={() => handleColor("blue")} />
                <FilterColor
                  color="purple"
                  onClick={() => handleColor("purple")}
                />
                <FilterColor color="pink" onClick={() => handleColor("pink")} />
                <FilterColor
                  color="white"
                  onClick={() => handleColor("white")}
                />
                <FilterColor color="gray" onClick={() => handleColor("gray")} />
                <FilterColor
                  color="green"
                  onClick={() => handleColor("green")}
                />
                <FilterColor color="teal" onClick={() => handleColor("teal")} />
                <FilterColor
                  color="orange"
                  onClick={() => handleColor("orange")}
                />
                <FilterColor
                  color="maroon"
                  onClick={() => handleColor("maroon")}
                />
              </div>
            </div>
          </div>
          <div className="filtered-prod-cont">
            {products?.map((product) => (
              <div
                className="shop col-lg-4 col-md-4 col-sm-6 filtered-prod"
                key={product._id}
              >
                <div className="border-product">
                  <Link to={`/products/${product._id}`}>
                    <div className="shopBack">
                      <img src={product.image} alt={product.productName} />
                    </div>
                  </Link>

                  <div className="shoptext">
                    <p>
                      <Link to={`/products/${product._id}`}>
                        {product.productName}
                      </Link>
                    </p>

                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                    <h3>Ksh {product.price}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="search-fragment-cont-mobile">
          <div className="col-4 col-md-6 mobile-filter-cont">
            <p className="filter-head">Price / Categories / Color / Filters</p>
            <div className="filterss">
              <div className="slider">
                <Slider
                  value={price}
                  min={minPrice}
                  max={maxPrice}
                  onChange={changePriceHandler}
                  valueLabelDisplay="on"
                  getAriaValueText={valuetext}
                />
              </div>
              <div className="mb-4">
                <div className="category-header">
                  <h5 className="filter-head">Colors</h5>
                </div>
                <div className="category-btn">
                  <div className="cat-btn" onClick={() => handleColor("")}>
                    All
                  </div>
                  <FilterColor
                    color="black"
                    value="black"
                    onClick={() => handleColor("black")}
                  />
                  <FilterColor color="red" onClick={() => handleColor("red")} />
                  <FilterColor
                    color="yellow"
                    onClick={() => handleColor("yellow")}
                  />
                  <FilterColor
                    color="blue"
                    onClick={() => handleColor("blue")}
                  />
                  <FilterColor
                    color="purple"
                    onClick={() => handleColor("purple")}
                  />
                  <FilterColor
                    color="pink"
                    onClick={() => handleColor("pink")}
                  />
                  <FilterColor
                    color="white"
                    onClick={() => handleColor("white")}
                  />
                  <FilterColor
                    color="gray"
                    onClick={() => handleColor("gray")}
                  />
                  <FilterColor
                    color="green"
                    onClick={() => handleColor("green")}
                  />
                  <FilterColor
                    color="teal"
                    onClick={() => handleColor("teal")}
                  />
                  <FilterColor
                    color="orange"
                    onClick={() => handleColor("orange")}
                  />
                  <FilterColor
                    color="maroon"
                    onClick={() => handleColor("maroon")}
                  />
                </div>
              </div>
              <section className="mb-4">
                <div className="category-header">
                  <h5 className="filter-head">Sources</h5>
                </div>
                <div className="category-btn ">
                  <div
                    className="cat-btn"
                    value="turkey"
                    onClick={() => handleSource("")}
                  >
                    All
                  </div>
                  <div
                    className="cat-btn"
                    value="turkey"
                    onClick={() => handleSource("turkey")}
                  >
                    Turkey
                  </div>
                  <div
                    className="cat-btn"
                    onClick={() => handleSource("china")}
                  >
                    China
                  </div>
                  <div
                    className="cat-btn"
                    onClick={() => handleSource("dubai")}
                  >
                    Dubai
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="mobile-filtered-prod">
            {products?.map((product) => (
              <div
                className="shop col-lg-2 col-md-4 col-sm-2 adjust-margin"
                key={product._id}
              >
                <div className="border-product">
                  <Link to={`/products/${product._id}`}>
                    <div className="shopBack">
                      <img src={product.image} alt={product.productName} />
                    </div>
                  </Link>

                  <div className="shoptext">
                    <p>
                      <Link to={`/products/${product._id}`}>
                        {product.productName}
                      </Link>
                    </p>

                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                    <h3>Ksh {product.price}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Pagination pages={pages} page={page} />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default CategoryScreen;
