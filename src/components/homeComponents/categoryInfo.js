import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryInfo = () => {
  const listCategories = useSelector((state) => state.listCategories);
  const { loading, error, categories } = listCategories;

  if (!loading && !error) {
    console.log(categories);
  }

  return (
    <>
      <div className="container cat-con">
        <div className="categor-container">
          {categories?.map((category) => (
            <Link
              to={`/products/category/${category.categoryName}`}
              key={category._id}
            >
              <div class="centeri">
                <div class="card d-flex align-items-center">
                  <img
                    src={category.categoryImage}
                    alt=""
                    class="foto"
                    style={{
                      width: "60%",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <p>{category.categoryName}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryInfo;
