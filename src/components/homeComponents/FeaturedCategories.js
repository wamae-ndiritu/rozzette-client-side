import React from "react";

const FeaturedCategories = ({ data }) => {
  return (
    <div className="container mb-4">
      {/* PC  */}
      <div className="featured-categories">
        <div className="d-flex justify-content-center">
          {data.map((product) => {
            const { id, name, image } = product;
            return (
              <div className="py-2 d-flex flex-column img-cat-cont" key={id}>
                <div className="excl-image-1">
                  <img src={image} alt={name} />
                </div>
                <p className="cat-p">{name}</p>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center align-items-center mb-2 more-link">
          <h6>View More</h6>
          <i className="fa fa-long-arrow-right"></i>
        </div>
      </div>
      {/* MOBILE  */}
      <div className="featured-categories-mobile">
        <div className="row mx-5 d-flex justify-content-center">
          {data.map((product) => {
            const { id, name, image } = product;
            return (
              <div
                className="col-3 p-2 d-flex justify-content-center flex-column mx-2"
                key={id}
              >
                <div className="excl-image-1">
                  <img src={image} alt={name} />
                </div>
                <p className="text-center cat-p">{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
