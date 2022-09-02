import React from "react";

const HeaderBar = ({ barTitle }) => {
  return (
    <div className="container mb-3">
      <div className="header-bar shadow-lg">
        <p className="px-3">{barTitle}</p>
      </div>
    </div>
  );
};

export default HeaderBar;
