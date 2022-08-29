import React, { useState, useEffect } from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import {
  getPriceRange,
  listCategoryProducts,
} from "../Redux/Actions/ProductActions";
import Slider from "@mui/material/Slider";
import { getCategories } from "../Redux/Actions/categoriesActions";
import styled from "@emotion/styled";
import { listSources } from "../Redux/Actions/sourceActions";

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 7px;
  margin-top: 7px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const CategoryFilters = ({ categoryName, pageNumber }) => {
  const dispatch = useDispatch();

  const priceRange = useSelector((state) => state.priceRange);
  const { minPrice, maxPrice } = priceRange;

  const [price, setPrice] = useState([minPrice, maxPrice]);
  const [color, setColor] = useState("");

  const [source, setSource] = useState("");
  const [otherCat, setOtherCat] = useState("");

  const sourceList = useSelector((state) => state.sourceList);
  const { sources } = sourceList;

  const listCategories = useSelector((state) => state.listCategories);
  const { loading, error, categories } = listCategories;

  const changePriceHandler = (e, value) => {
    setPrice(value);
  };

  const handleColor = (value) => {
    setColor(value);
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(listSources());
    dispatch(getPriceRange());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      listCategoryProducts(
        categoryName,
        pageNumber,
        price,
        color,
        source,
        otherCat
      )
    );
  }, [dispatch, pageNumber, categoryName, price, color, source, otherCat]);

  useEffect(() => {
    if ($(window).innerWidth() <= 400) {
      $("#filters").addClass("mx-4");
    }
  }, []);

  return (
    <>
      <div className="container mt-4 filters-shadow" id="top-filters">
        <div className="filters py-4" id="filters">
          <h5 className="filter-head">Price / Categories / Color / Filters</h5>
          <div className="category-header-price">
            <h5 className="filter-head">Price (KES) </h5>
            <div className="price-cont my-3">
              <div className="price-limits" style={{ marginRight: "15px" }}>
                <p>MIN PRICE</p>
                <div className="price-space">{price[0]}</div>
              </div>
              <div className="price-limits">
                <p>MAX PRICE</p>
                <div className="price-space">{price[1]}</div>
              </div>
            </div>
          </div>
          <div className="px-6 slider-size">
            <Slider
              value={price}
              min={minPrice}
              max={maxPrice}
              onChange={changePriceHandler}
              valueLabelDisplay="on"
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
                    <select
                      className="filter-sect-cont"
                      onChange={(e) => setOtherCat(e.target.value)}
                    >
                      <option value="">All</option>
                      {categories
                        ?.filter(
                          (category) => category.categoryName !== categoryName
                        )
                        .map((category) => {
                          return (
                            <option
                              key={category._id}
                              value={category.categoryName}
                              className="option-filter"
                            >
                              {category.categoryName}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </>
              )}
            </div>
          </section>
          <section className="mb-4">
            <div className="category-header">
              <h5 className="filter-head">Sources</h5>
            </div>
            <select
              className="category-btn filter-sect-cont"
              onChange={(e) => setSource(e.target.value)}
            >
              <option onChange={(e) => setSource(e.target.value)} value="">
                All
              </option>
              {sources?.map((source) => (
                <option
                  className="cat-btn"
                  value={source.name}
                  key={source._id}
                  onChange={(e) => setSource(e.target.value)}
                >
                  {source.name}
                </option>
              ))}
            </select>
          </section>
          <div className="mb-4">
            <div className="category-header">
              <h5 className="filter-head">Colors</h5>
            </div>
            <div className="btn btn-main-1" onClick={() => handleColor("")}>
              All Colors
            </div>
            <div className="category-btn">
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
              <FilterColor color="white" onClick={() => handleColor("white")} />
              <FilterColor color="gray" onClick={() => handleColor("gray")} />
              <FilterColor color="green" onClick={() => handleColor("green")} />
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
      </div>
    </>
  );
};

export default CategoryFilters;
