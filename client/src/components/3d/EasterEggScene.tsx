import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface EasterEggSceneProps {
  isActive: boolean;
  onComplete: () => void;
}

export function EasterEggScene({ isActive, onComplete }: EasterEggSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const emojisRef = useRef<THREE.Mesh[]>([]);
  const completedRef = useRef<boolean>(false);

  // Define emojis to use
  const emojiTexts = ['🎮', '💻', '🎨', '🤖', '🧠', '📱', '🚀', '🔍', '⚙️', '🌟'];

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create canvas for emojis
    const createEmojiTexture = (text: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 128;
      canvas.height = 128;
      
      if (context) {
        context.fillStyle = 'transparent';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.font = '80px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        context.fillText(text, canvas.width / 2, canvas.height / 2);
      }
      
      return new THREE.CanvasTexture(canvas);
    };

    // Create emojis
    const emojis: THREE.Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const emojiText = emojiTexts[Math.floor(Math.random() * emojiTexts.length)];
      const texture = createEmojiTexture(emojiText);
      
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const geometry = new THREE.PlaneGeometry(1, 1);
      const emoji = new THREE.Mesh(geometry, material);
      
      // Randomize position
      emoji.position.x = Math.random() * 10 - 5;
      emoji.position.y = Math.random() * 10 - 5;
      emoji.position.z = Math.random() * 5 - 10;
      
      // Random rotation
      emoji.rotation.x = Math.random() * Math.PI;
      emoji.rotation.y = Math.random() * Math.PI;
      
      // Store velocity as a custom property
      (emoji as any).velocity = {
        x: Math.random() * 0.05 - 0.025,
        y: Math.random() * 0.05 - 0.025,
        z: Math.random() * 0.05 + 0.05
      };
      
      scene.add(emoji);
      emojis.push(emoji);
    }
    
    emojisRef.current = emojis;

    // Create special particle for "About Me" text
    const aboutText = new THREE.Group();
    const createLetterMesh = (letter: string, index: number, total: number) => {
      const texture = createEmojiTexture(letter);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const geometry = new THREE.PlaneGeometry(0.8, 0.8);
      const letterMesh = new THREE.Mesh(geometry, material);
      
      // Position letters side by side with slight spacing
      const spacing = 0.7;
      const totalWidth = total * spacing;
      letterMesh.position.x = (index * spacing) - (totalWidth / 2) + (spacing / 2);
      
      return letterMesh;
    };

    const aboutMeText = "Ayush's World";
    for (let i = 0; i < aboutMeText.length; i++) {
      const letterMesh = createLetterMesh(aboutMeText[i], i, aboutMeText.length);
      aboutText.add(letterMesh);
    }
    
    aboutText.position.set(0, 0, -5);
    scene.add(aboutText);

    // Animation function
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      // Animate each emoji
      emojisRef.current.forEach((emoji) => {
        // Access custom velocity property
        const velocity = (emoji as any).velocity;
        
        // Update position based on velocity
        emoji.position.x += velocity.x;
        emoji.position.y += velocity.y;
        emoji.position.z += velocity.z;
        
        // Slow rotation
        emoji.rotation.x += 0.01;
        emoji.rotation.y += 0.01;
        
        // If emoji gets close to camera, mark as completed
        if (emoji.position.z > 4 && !completedRef.current) {
          completedRef.current = true;
          
          // Wait a bit before calling onComplete
          setTimeout(() => {
            onComplete();
          }, 1000);
        }
      });
      
      // Animate about text
      aboutText.rotation.y += 0.01;
      aboutText.position.z += 0.03;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Clean up geometries and materials
      emojisRef.current.forEach((emoji) => {
        emoji.geometry.dispose();
        (emoji.material as THREE.Material).dispose();
      });
    };
  }, [isActive]);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}