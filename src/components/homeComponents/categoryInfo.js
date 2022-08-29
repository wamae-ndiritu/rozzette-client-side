import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryInfo = () => {
  const listCategories = useSelector((state) => state.listCategories);
  const { categories } = listCategories;

  return (
    <>
      <div className="container mb-4">
        <div
          style={{ backgroundColor: "orange" }}
          className="row d-flex justify-content-center"
        >
          {categories?.map((category) => (
            <Link
              to={`/products/category/${category.categoryName}`}
              key={category._id}
              className="col-1 px-2 pt-2 foto-img"
            >
              <div className="card d-flex align-items-center">
                <img
                  src={category.categoryImage}
                  alt=""
                  style={{
                    width: "100%",
                    height: "40px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p className="category-title">{category.categoryName}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryInfo;
