import React, { useState } from "react";
import "./Carousel.css"; // Asegúrate de crear un archivo CSS para estilizar el carrusel.

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="carousel">
      <button onClick={handlePrev} className="carousel-button prev-button">{"<"}</button>
      <div className="carousel-item">
        <h3 className="section-title">Consecuencia {currentIndex + 1}</h3>
        <p className="section-text">{items[currentIndex]}</p>
      </div>
      <button onClick={handleNext} className="carousel-button next-button">{">"}</button>
    </div>
  );
};

export default Carousel;
