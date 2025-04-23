import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { useFadeIn } from "@/hooks/useFadeIn";
import { Linkedin, Github, Sparkles } from "lucide-react";
import { EasterEggScene } from "./3d/EasterEggScene";

export function AboutSection() {
  const fadeInRef1 = useFadeIn();
  const fadeInRef2 = useFadeIn();
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEggHint, setShowEasterEggHint] = useState(false);
  
  // Parallax effect for the about image
  const aboutImgRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!aboutImgRef.current) return;
      
      const x = (window.innerWidth / 2 - e.pageX) / 30;
      const y = (window.innerHeight / 2 - e.pageY) / 30;
      
      aboutImgRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  // Easter egg activation
  const handleImageClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Show hint after 2 clicks
    if (newCount === 2 && !showEasterEggHint) {
      setShowEasterEggHint(true);
      
      // Hide hint after 3 seconds
      setTimeout(() => {
        setShowEasterEggHint(false);
      }, 3000);
    }
    
    // Activate easter egg after 5 clicks
    if (newCount >= 5) {
      setEasterEggActive(true);
      setClickCount(0);
    }
  };

  return (
    <section id="about" className="py-24 theme-transition">
      <div className="container mx-auto px-6">
        <div ref={fadeInRef1} className="fade-in mb-16 text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl relative inline-block">
            About Me
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary dark:bg-primary transform -translate-y-2"></span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div ref={fadeInRef2} className="fade-in order-2 md:order-1">
            <h3 className="font-poppins font-bold text-2xl mb-6 text-primary dark:text-primary">My Journey</h3>
            <p className="mb-4">
              I'm Ayush Vishwakarma, a Computer Science undergraduate specializing in AI/ML with a keen interest in UI/UX design. I'm passionate about creating innovative, user-centric solutions that combine beautiful interfaces with powerful functionality.
            </p>
            <p className="mb-4">
              My expertise includes working with tools like Figma, Framer, React.js for UI/UX design, and Python, OpenCV, and Vision Transformers for AI/ML projects. I'm constantly exploring new technologies to enhance my skill set.
            </p>
            <p className="mb-6">
              Notable projects include a sign language translator, a Disney+ Hotstar clone, an AI-powered topic explainer, and ongoing research on multimodal emotion recognition and real-time sign language sentence translation.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg theme-transition">
                <h4 className="font-medium mb-1">Education</h4>
                <p>CS Undergraduate</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg theme-transition">
                <h4 className="font-medium mb-1">Focus Areas</h4>
                <p>UI/UX, AI/ML</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg theme-transition">
                <h4 className="font-medium mb-1">Location</h4>
                <p>India</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg theme-transition">
                <h4 className="font-medium mb-1">Certifications</h4>
                <p>Python, Java DS</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://www.linkedin.com/in/duhitsayu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-link flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-opacity-90 transition"
              >
                <Linkedin size={16} />
                Linkedin
              </a>
              <a 
                href="https://github.com/duhitsayu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-link flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-opacity-90 transition"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>
          
          <div className="fade-in order-1 md:order-2 relative">
            <div 
              ref={imgContainerRef}
              className="relative w-full h-80 md:h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden theme-transition cursor-pointer about-img-clickable"
              onClick={handleImageClick}
            >
              <div 
                ref={aboutImgRef}
                className="w-full h-full"
              >
                <img 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Ayush Vishwakarma" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent-light/30 dark:from-primary/30 dark:to-accent-dark/30 mix-blend-overlay"></div>
              </div>
              
              {/* Easter egg hint */}
              {showEasterEggHint && (
                <div className="absolute top-4 right-4 bg-primary dark:bg-primary text-white px-3 py-1 rounded-full flex items-center shadow-md easter-egg-hint">
                  <Sparkles className="h-4 w-4 mr-1" />
                  <span className="text-xs">Keep clicking for a surprise!</span>
                </div>
              )}
              
              {clickCount > 0 && clickCount < 5 && (
                <div className="absolute bottom-4 left-4 text-xs text-white bg-black/60 px-2 py-1 rounded">
                  Clicks: {clickCount}/5
                </div>
              )}
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-lg bg-accent-light dark:bg-accent-dark text-white flex items-center justify-center theme-transition transform rotate-3 shadow-lg">
              <div className="text-center p-3">
                <div className="font-bold text-2xl">UI/UX</div>
                <div className="text-sm">Design Enthusiast</div>
              </div>
            </div>
            
            {/* Easter egg animation */}
            <EasterEggScene 
              isActive={easterEggActive} 
              onComplete={() => setEasterEggActive(false)} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
