import React, { useState, useEffect, useCallback } from 'react';
import './Home.css';

// Import your images
import image1 from './comp';
// import image2 from '../assets/carousel2.jpg';
// import image3 from '../assets/carousel3.jpg';
// import image4 from '../assets/carousel4.jpg';

const Home = () => {
  const slides = [
    {
      image: image1,
      title: "Discover Amazing Features",
      description: "Explore our platform's powerful capabilities"
    },
    {
      image: image2,
      title: "Premium Quality Service",
      description: "Experience excellence in every interaction"
    },
    {
      image: image3,
      title: "Innovative Solutions",
      description: "Cutting-edge technology for your needs"
    },
    {
      image: image4,
      title: "Join Our Community",
      description: "Be part of something extraordinary"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // Auto-play functionality
  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(goToNext, 5000); // Change every 5 seconds
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlaying, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <div 
      className="carousel-container"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div 
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="carousel-image"
              loading="lazy"
            />
            <div className="carousel-caption">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        className="carousel-arrow prev"
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        &lt;
      </button>
      <button 
        className="carousel-arrow next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        &gt;
      </button>

      {/* Navigation Dots */}
      <div className="carousel-nav">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;