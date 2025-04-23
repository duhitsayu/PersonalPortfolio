import { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Adjust pixel ratio for better performance on mobile
    const pixelRatio = isMobile ? 
      Math.min(1.5, window.devicePixelRatio) : 
      window.devicePixelRatio;
    renderer.setPixelRatio(pixelRatio);
    
    // Add particles - reduce count on mobile
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = isMobile ? 2000 : 5000;
    
    const posArray = new Float32Array(particlesCnt * 3);
    
    for(let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.01 : 0.005,
      color: theme === 'dark' ? 0x4d8bf8 : 0x2563eb, // Brighter blue in dark mode
      transparent: true,
      opacity: 0.7
    });
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Set camera position
    camera.position.z = 2;
    
    // Mouse interaction for particles - limited on mobile
    let mouseX = 0;
    let mouseY = 0;
    
    function onDocumentMouseMove(event: MouseEvent) {
      mouseX = (event.clientX - window.innerWidth / 2) / (isMobile ? 2000 : 1000);
      mouseY = (event.clientY - window.innerHeight / 2) / (isMobile ? 2000 : 1000);
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Animation loop - slower rotation on mobile
    function animate() {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += isMobile ? 0.0001 : 0.0003;
      particlesMesh.rotation.y += isMobile ? 0.0003 : 0.0005;
      
      // Respond to mouse - reduced effect on mobile
      const mouseEffect = isMobile ? 0.02 : 0.05;
      particlesMesh.rotation.x += mouseY * mouseEffect;
      particlesMesh.rotation.y += mouseX * mouseEffect;
      
      renderer.render(scene, camera);
    }
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Adjust pixel ratio on resize
      const newPixelRatio = window.innerWidth < 768 ? 
        Math.min(1.5, window.devicePixelRatio) : 
        window.devicePixelRatio;
      renderer.setPixelRatio(newPixelRatio);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Update particle color on theme change
    const updateParticleColor = () => {
      if (particlesMaterial) {
        particlesMaterial.color = new THREE.Color(
          theme === 'dark' ? 0x4d8bf8 : 0x2563eb
        );
      }
    };
    
    updateParticleColor();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      
      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [theme, isMobile]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
