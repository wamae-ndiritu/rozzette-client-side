import React, { useEffect } from "react";
import $ from "jquery";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FiltersSection from "../components/homeComponents/FiltersSection";
import SearchSection from "../components/homeComponents/SearchSection";

const ShopPage = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber;
  const categoryName = match.params.categoryName;
  const title = "Shop";
  useEffect(() => {
    document.title = `Rozzette | ${title}`;
  }, []);

  $(window).scroll(function () {
    if ($(this).scrollTop() + $(this).height() === $(document).height()) {
      $("#top-filters").addClass("stick-filters-2");
    }
  });

  useEffect(() => {
    if ($(window).innerWidth() <= 400) {
      $("#mobile-filter-container").removeClass("row");
      $("#filter-col").removeClass("col-3");
      $("#search-col").removeClass("col-9");
    }
  }, []);

  return (
    <div className="">
      <Header />
      <div
        className="row mb-4 mobile-filter-container"
        id="mobile-filter-container"
      >
        <div className="col-3 col-sm-4" id="filter-col">
          <FiltersSection
            keyword={keyword}
            pageNumber={pageNumber}
            categoryName={categoryName}
          />
        </div>
        <div className="col-9 col-sm-8" id="search-col">
          <SearchSection keyword={keyword} category={categoryName} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
