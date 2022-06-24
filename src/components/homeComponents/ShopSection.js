import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { getPriceRange, listProduct } from "../../Redux/Actions/ProductActions";
import Slider from "@mui/material/Slider";
import { getCategories } from "../../Redux/Actions/categoriesActions";
import styled from "@emotion/styled";

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 7px;
  margin-top: 7px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const priceRange = useSelector((state) => state.priceRange);
  const { minPrice, maxPrice } = priceRange;

  const [price, setPrice] = useState([minPrice, maxPrice]);
  const [color, setColor] = useState("");
  const [source, setSource] = useState("");
  const [cat, setCat] = useState("");

  const productList = useSelector((state) => state.productList);
  const { products, page, pages } = productList;

  const listCategories = useSelector((state) => state.listCategories);
  const { loading, error, categories } = listCategories;

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

  const handleCat = (value) => {
    setCat(value);
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPriceRange());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber, price, cat, color, source));
  }, [dispatch, keyword, pagenumber, price, cat, color, source]);

  return (
    <>
      <div className="container shop-section-mobile">
        <div className="section">
          <div className="row section-row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {keyword ? (
                  <>
                    <section className="search-fragment-cont">
                      <div className="filters-cont col-4 col-md-6">
                        <h5 className="filter-head">
                          Price / Categories / Color / Filters
                        </h5>
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
                          <div className="check-box-cont">
                            {loading && error ? (
                              <div className="category-header">
                                <h5 className="filter-head">Categories</h5>
                              </div>
                            ) : (
                              <>
                                <div className="category-header">
                                  <h5 className="filter-head">Categories</h5>
                                </div>
                                <div className="category-btn">
                                  <div
                                    className="cat-btn"
                                    onClick={() => handleCat("")}
                                  >
                                    All
                                  </div>
                                  {categories?.map((category) => {
                                    return (
                                      <div key={category._id}>
                                        <div
                                          className="cat-btn"
                                          onClick={() =>
                                            handleCat(
                                              `${category.categoryName}`
                                            )
                                          }
                                        >
                                          {category.categoryName}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                        </section>
                        <section className="mb-4">
                          <div className="category-header">
                            <h5 className="filter-head">Sources</h5>
                          </div>
                          <div className="category-btn ">
                            <div
                              className="cat-btn"
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
                        <div className="mb-4">
                          <div className="category-header">
                            <h5 className="filter-head">Colors</h5>
                          </div>
                          <div className="category-btn">
                            <div
                              className="cat-btn"
                              onClick={() => handleColor("")}
                            >
                              All
                            </div>
                            <FilterColor
                              color="black"
                              value="black"
                              onClick={() => handleColor("black")}
                            />
                            <FilterColor
                              color="red"
                              onClick={() => handleColor("red")}
                            />
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
                                  <img
                                    src={product.image}
                                    alt={product.productName}
                                  />
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
                        <p className="filter-head">
                          Price / Categories / Color / Filters
                        </p>
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
                          <section className="mb-4">
                            <div className="check-box-cont">
                              {loading && error ? (
                                <div className="category-header">
                                  <h5 className="filter-head">Categories</h5>
                                </div>
                              ) : (
                                <>
                                  <div className="category-header">
                                    <h5 className="filter-head">Categories</h5>
                                  </div>
                                  <div className="category-btn">
                                    {categories?.map((category) => {
                                      return (
                                        <div key={category._id}>
                                          <div className="cat-btn">
                                            {category.categoryName}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              )}
                            </div>
                          </section>
                          <div className="mb-4">
                            <div className="category-header">
                              <h5 className="filter-head">Colors</h5>
                            </div>
                            <div className="category-btn">
                              <FilterColor
                                color="black"
                                value="black"
                                onClick={() => handleColor("black")}
                              />
                              <FilterColor
                                color="red"
                                onClick={() => handleColor("red")}
                              />
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
                                  <img
                                    src={product.image}
                                    alt={product.productName}
                                  />
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
                  </>
                ) : (
                  <>
                    <div className="shop-section-big-screen desktop-mode">
                      {products?.map((product) => (
                        <div
                          className="shop col-lg-3 col-md-6 col-sm-6 filtered-prod single-row"
                          key={product._id}
                        >
                          <div className="border-product">
                            <Link to={`/products/${product._id}`}>
                              <div className="shopBack">
                                <img
                                  src={product.image}
                                  alt={product.productName}
                                />
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
                    <div className="shop-section-big-screen laptop-mode">
                      {products?.map((product) => (
                        <div
                          className="shop col-lg-4 col-md-4 col-sm-6 filtered-prod single-row"
                          key={product._id}
                        >
                          <div className="border-product">
                            <Link to={`/products/${product._id}`}>
                              <div className="shopBack">
                                <img
                                  src={product.image}
                                  alt={product.productName}
                                />
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
                    <div className="shop-section-mobile-1">
                      {products?.map((product) => (
                        <div
                          className="shop col-lg-2 col-md-4 col-sm-2 mobile-shop"
                          key={product._id}
                        >
                          <div className="border-product">
                            <Link to={`/products/${product._id}`}>
                              <div className="shopBack">
                                <img
                                  src={product.image}
                                  alt={product.productName}
                                />
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
                  </>
                )}
                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
