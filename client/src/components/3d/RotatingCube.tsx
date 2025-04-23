import { useRef, useEffect, useState } from 'react';

interface RotatingCubeProps {
  name: string;
  svgPath: string;
  index: number;
}

export function RotatingCube({ name, svgPath, index }: RotatingCubeProps) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show cube with a small delay based on index to create a sequence effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 * index);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  useEffect(() => {
    if (!cubeRef.current || !isVisible) return;
    
    let rotationY = 0;
    const speed = 0.4 + (index * 0.08); // Slightly slower speed for stability
    let animationId: number;
    let isActive = true;
    
    function rotateCube() {
      if (!cubeRef.current || !isActive) return;
      
      rotationY += speed;
      cubeRef.current.style.transform = `rotateY(${rotationY}deg)`;
      
      // Reset rotation to avoid large numbers
      if (rotationY > 360) {
        rotationY = rotationY % 360;
      }
      
      animationId = requestAnimationFrame(rotateCube);
    }
    
    // Start animation with a slight delay
    const startTimer = setTimeout(() => {
      rotateCube();
    }, 100);
    
    return () => {
      isActive = false;
      clearTimeout(startTimer);
      cancelAnimationFrame(animationId);
    };
  }, [index, isVisible]);

  return (
    <div className={`group cube-container mx-auto ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <div 
        ref={cubeRef} 
        className="cube"
        style={{ transform: 'rotateY(0deg)' }} // Initial transform
      >
        <div className="cube-face absolute inset-0 rounded-xl bg-white dark:bg-gray-700 theme-transition shadow-md flex items-center justify-center transform rotate-y-0 group-hover:rotate-y-180 transition duration-500">
          <div className="p-6 text-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mx-auto mb-2 text-primary dark:text-blue-400" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d={svgPath} />
            </svg>
            <p className="font-medium">{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
