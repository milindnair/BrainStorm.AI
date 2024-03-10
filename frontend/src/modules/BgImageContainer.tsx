import React from 'react';
import bgimage from "../assets/BgImg.png"

const BgImageContainer = ({ children }) => {
  return (
    <div className="bg-image-container relative h-[100vh] w-full">
      <img
        src={bgimage}
        alt="Background Image"
        className="bg-image absolute top-0 left-0 h-full w-full object-cover z-0"
      />
      <div className="z-10 relative">{children}</div>
    </div>
  );
};

export default BgImageContainer;
