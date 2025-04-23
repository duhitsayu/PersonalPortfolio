import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/3d/ParticleField";
import { useFadeIn } from "@/hooks/useFadeIn";

export function HeroSection() {
  const fadeInRef = useFadeIn();

  const handleNavigation = (href: string) => {
    window.location.href = href;
  };

  return (
    <section id="home" className="relative h-screen flex items-center">
      <div className="hero-3d-canvas">
        <ParticleField />
      </div>
      <div className="absolute inset-0 light-bg-gradient dark:dark-bg-gradient"></div>
      
      <div className="container mx-auto px-6 z-10">
        <div ref={fadeInRef} className="fade-in max-w-3xl">
          <h1 className="font-poppins font-bold text-4xl md:text-6xl mb-4">
            <span className="block">Hi, I'm</span>
            <span className="text-primary dark:text-blue-400">Ayush Vishwakarma</span>
          </h1>
          <h2 className="text-xl md:text-2xl mb-8 opacity-80">Computer Science Student & UI/UX Enthusiast</h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl">
            Passionate about creating innovative, user-centric solutions with expertise in UI/UX design, AI/ML, and software development.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="px-8 py-3 font-medium rounded-full"
              onClick={() => handleNavigation("#contact")}
            >
              Get in Touch
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-3 font-medium rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary"
              onClick={() => handleNavigation("#projects")}
            >
              View My Work
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => handleNavigation("#about")}
      >
        <ArrowDown className="h-8 w-8" />
      </div>
    </section>
  );
}
