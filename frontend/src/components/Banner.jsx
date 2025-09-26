import React, { useState, useEffect, useRef } from 'react';

const Banner = () => {
  const slides = [
    "/images/banner1.jpeg",
    "/images/banner14.jpeg",
    "/images/banner13.jpeg",
    "/images/banner12.jpeg",
    "/images/banner11.jpeg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    const slideWidth = slider.clientWidth;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }, [currentSlide]);

  return (
    <div className="flex flex-col items-center">
      <div className="h-150 max-w-10sm overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          ref={sliderRef}
        >
          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-full flex-shrink-0"
              alt={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center mt-5 space-x-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentSlide ? "bg-black" : "bg-black/20"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
