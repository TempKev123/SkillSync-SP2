import { useState, useEffect } from 'react';
import bg1 from '../images/bg1.jpg';
import bg2 from '../images/bg2.jpg';
import bg3 from '../images/bg3.jpg';

const CyclingBackground = () => {
  const images = [bg1, bg2, bg3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      const transitionTimeout = setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsFading(false);
      }, 800); // Smooth 800ms transition

      return () => clearTimeout(transitionTimeout);
    }, 5000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* 1. The Background Image Layer */}
      <div 
        className={`fixed inset-0 -z-20 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          isFading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          // Ensures the background doesn't shift when mobile browser UI elements appear
          height: '100dvh' 
        }}
      />

      {/* 2. The Premium Mobile-Optimized Overlay */}
      {/* This layer makes the text on your project cards "pop" */}
      <div 
        className="fixed inset-0 -z-10 transition-colors duration-1000"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(136, 124, 208, 0.4) 100%)",
          backdropBlur: '2px' // Subtle blur for a premium glass effect
        }}
      />
    </>
  );
};

export default CyclingBackground;