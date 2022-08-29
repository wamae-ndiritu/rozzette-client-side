import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { page, pages, keyword = "", category = "" } = props;
  const [consequtPages, setConsequtPages] = useState([]);

  const prevPage = (page, pages) => {
    if (page === 1) {
      return pages;
    }
    if (page < pages) {
      return page - 1;
    }
    if (page === pages) {
      return pages - 1;
    }
  };
  const nextPage = (page, pages) => {
    if (page < pages) {
      return page + 1;
    }
    if (page === pages) {
      return 1;
    }
  };

  useEffect(() => {
    setConsequtPages([prevPage(page, pages), page, nextPage(page, pages)]);
  }, [page, pages]);

  return (
    <>
      {pages > 1 && pages <= 5 && (
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(pages).keys()].map((x) => (
              <li
                className={`page-item ${x + 1 === page ? "active" : ""}`}
                key={x + 1}
              >
                <Link
                  className="page-link"
                  to={
                    (keyword && `/search/${keyword}/page/${x + 1}`) ||
                    (keyword &&
                      category`/search/${keyword}/${category}/page/${x + 1}`) ||
                    (category &&
                      `/products/category/${category}/page/${x + 1}`) ||
                    (!keyword && !category && `/page/${x + 1}`)
                  }
                >
                  {x + 1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {pages > 5 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className="page-item d-flex align-items-center mx-2">
              <Link
                to={
                  (keyword &&
                    `/search/${keyword}/page/${
                      page > 1 ? `${page - 1}` : page === 1 && `${pages}`
                    }`) ||
                  (keyword &&
                    category`/search/${keyword}/${category}/page/${
                      page > 1 ? `${page - 1}` : page === 1 && `${pages}`
                    }`) ||
                  (category &&
                    `/products/category/${category}/page/${
                      page > 1 ? `${page - 1}` : page === 1 && `${pages}`
                    }`) ||
                  (!keyword &&
                    !category &&
                    `/page/${
                      page > 1 ? `${page - 1}` : page === 1 && `${pages}`
                    }`)
                }
              >
                <ArrowBackIosIcon />
              </Link>
            </li>
            {consequtPages.map((x) => (
              <li className={`page-item ${x === page ? "active" : ""}`} key={x}>
                <Link
                  className="page-link"
                  to={
                    (keyword && `/search/${keyword}/page/${x}`) ||
                    (keyword &&
                      category`/search/${keyword}/${category}/page/${x}`) ||
                    (category && `/products/category/${category}/page/${x}`) ||
                    (!keyword && !category && `/page/${x}`)
                  }
                >
                  {x}
                </Link>
              </li>
            ))}
            <li className="page-item d-flex align-items-center mx-2">
              <Link
                to={
                  (keyword &&
                    `/search/${keyword}/page/${
                      page < pages ? `${page + 1}` : page === pages && `${1}`
                    }`) ||
                  (keyword &&
                    category &&
                    `/search/${keyword}/${category}/page/${
                      page < pages ? `${page + 1}` : page === pages && `${1}`
                    }`) ||
                  (category &&
                    `/products/category/${category}/page/${
                      page < pages ? `${page + 1}` : page === pages && `${1}`
                    }`) ||
                  (!keyword &&
                    !category &&
                    `/page/${
                      page < pages ? `${page + 1}` : page === pages && `${1}`
                    }`)
                }
              >
                <ArrowForwardIosIcon />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Pagination;
