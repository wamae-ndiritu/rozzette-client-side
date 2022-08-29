import React from "react";
import banner from "../Images/banner.mp4";

const Banner = () => {
  return (
    <div className="container">
      <video
        controls
        style={{ width: "100%", height: "20vh", objectFit: "contain" }}
      >
        {" "}
        <source src={banner} type="video/mp4" />
      </video>
    </div>
  );
};

export default Banner;
