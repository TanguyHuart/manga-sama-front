import React, { useState, useEffect } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
}

function Carousel({ images }: CarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  useEffect(() => {
    const next = () => {
      const newIndex = (currentImageIndex + 1) % images.length;

      setCurrentImageIndex(newIndex);
    };
    // Auto rotate images every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length]);

  return (
    <div className="carousel">
      <img
        className="carousel__img"
        src={images[currentImageIndex]}
        alt={`slide-${currentImageIndex}`}
      />
      {images.length > 1 && (
        <div className="carousel__nav">
          <button
            className="carousel__nav-btn"
            type="button"
            onClick={prevImage}
          >
            <img
              className="carousel__nav-btn--left"
              src="/assets/icons/arrow-point-to-right.png"
              alt="left arrow"
            />
          </button>
          <button
            className="carousel__nav-btn"
            type="button"
            onClick={nextImage}
          >
            <img
              className="carousel__nav-btn--right"
              src="/assets/icons/arrow-point-to-right.png"
              alt="right arrow"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default Carousel;
