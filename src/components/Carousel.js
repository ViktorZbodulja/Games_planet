import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    // Use controls.start() inside useEffect to avoid the error
    controls.start({
      x: `-${currentIndex * 100}%`,
      transition: { type: "tween", duration: 0.5 },
    });
  }, [currentIndex, controls]);

  return (
    <div className="carousel-container">
      <motion.div className="carousel" animate={controls}>
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            {item}
          </div>
        ))}
      </motion.div>
      <button onClick={prevSlide}>Previous</button>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Carousel;
