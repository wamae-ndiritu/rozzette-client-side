import React, { useEffect } from "react";
import $ from "jquery";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategorySearchedProducts from "../components/CategorySearchedProducts";
import CategoryFilters from "../components/categoryFilters";
import { listCategoryProducts } from "../Redux/Actions/ProductActions";

const CategoryScreen = ({ match }) => {
  const dispatch = useDispatch();

  const categoryName = match.params.categoryName;
  const pageNumber = Number(match.params.pageNumber);

  const title = "Shop";
  useEffect(() => {
    document.title = `Rozzette | ${title}`;
  }, []);

  useEffect(() => {
    dispatch(listCategoryProducts(categoryName, pageNumber));
  }, [dispatch, categoryName, pageNumber]);

  useEffect(() => {
    if ($(window).innerWidth() <= 400) {
      $("#mobile-filter-container").removeClass("row");
      $("#filter-col").removeClass("col-3");
      $("#search-col").removeClass("col-9");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="row mb-4" id="mobile-filter-container">
        <div className="col-3" id="filter-col">
          <CategoryFilters
            categoryName={categoryName}
            pageNumber={pageNumber}
          />
        </div>
        <div className="col-9" id="search-col">
          <CategorySearchedProducts category={categoryName} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryScreen;
