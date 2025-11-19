import { useState, useEffect } from 'react';
import bg1 from '../images/bg1.jpg';
import bg2 from '../images/bg2.jpg';
import bg3 from '../images/bg3.jpg';
const CyclingBackground = () => {
  const images = [bg1,bg2,bg3];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false); // New state to control fade

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Start fade-out
      setIsFading(true);

      // 2. Wait for the transition duration (1000ms from the CSS class)
      // and then update the image index
      const transitionTimeout = setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsFading(false); // 3. Start fade-in immediately after changing the index
      }, 600); // Should match the CSS 'duration-1000'

      // Clean up the transition timeout
      return () => clearTimeout(transitionTimeout);
      
    }, 5000); // Total cycle time

    // Clean up the main interval
    return () => clearInterval(interval);
    
  }, [images.length]);

  return (
    <div 
      className={`fixed inset-0 -z-10 bg-cover bg-center transition-opacity duration-600 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100 '}`}
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    />
  );
};

export default CyclingBackground;