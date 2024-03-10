import React from 'react';
import bgimage from "../assets/BgImg.png"
import Footer from './Footer';

const BgImageContainer = ({ children }) => {
  return (
    <div className="bg-image-container h-full w-full">
      <img
        src={bgimage}

        className="bg-image absolute top-0 left-0 h-full w-full object-cover z-0"
      />
      {children}
    </div>
  );
};

export default BgImageContainer;