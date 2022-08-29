import React from "react";
import banner1 from "../../Images/banner-1.jpg";
import { data } from "../../data/exclusiveProducts";

const Slider = () => {
  return (
    <section className="container mb-4">
      <div className="carousel-wrapper">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="5000">
              <img src={banner1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="10000">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/rozzette-store.appspot.com/o/1655904570569pexels-tembela-bohle-1884579.jpg?alt=media&token=0e8b18b1-51f9-4b3b-a589-669b76bfbf2f"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/rozzette-store.appspot.com/o/1655904516833pexels-terje-sollie-298863.jpg?alt=media&token=90d96c80-6131-4066-94a2-f751f213ec71"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="featured-products">
          <div className="shadow-lg mx-3 my-4 heading-bar">
            <p className="text-center ">Exclusive Shopping</p>
          </div>
          <div className="row d-flex justify-content-center mx-5">
            {data.map((product) => {
              const { id, name, image } = product;
              return (
                <div
                  className="col-4 p-2 d-flex justify-content-center flex-column"
                  key={id}
                >
                  <div className="excl-image">
                    <img src={image} alt={name} />
                  </div>
                  <p>{name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
