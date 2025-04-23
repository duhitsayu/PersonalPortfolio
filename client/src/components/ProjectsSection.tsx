import { useFadeIn } from "@/hooks/useFadeIn";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

// Project data
const projects = [
  {
    id: 1,
    title: "Sign Language Translator",
    description: "Developed an AI-powered tool that translates sign language gestures to text in real-time, improving accessibility for the hearing impaired.",
    image: "https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Computer Vision",
    technologies: ["Python", "OpenCV", "TensorFlow", "MediaPipe"],
    link: "#"
  },
  {
    id: 2,
    title: "Disney+ Hotstar Clone",
    description: "Built a pixel-perfect Disney+ Hotstar clone with full responsive design, custom animations, and comprehensive UI/UX flow.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "UI/UX Design",
    technologies: ["React.js", "Framer Motion", "Styled Components"],
    link: "#"
  },
  {
    id: 3,
    title: "AI Topic Explainer",
    description: "Created an application that uses AI to explain complex topics in simple terms, with visual aids and interactive elements to enhance understanding.",
    image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Natural Language Processing",
    technologies: ["Python", "OpenAI API", "React.js", "D3.js"],
    link: "#"
  },
  {
    id: 4,
    title: "Multimodal Emotion Recognition",
    description: "Research project on emotion recognition using facial expressions, voice tone, and text sentiment analysis for more accurate human emotion detection.",
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "AI/ML Research",
    technologies: ["Python", "Computer Vision", "NLP", "Audio Processing"],
    link: "#"
  }
];

export function ProjectsSection() {
  const titleRef = useFadeIn();
  const projectRefs = [useFadeIn(), useFadeIn(), useFadeIn(), useFadeIn()];
  const buttonRef = useFadeIn();

  return (
    <section id="projects" className="py-24 theme-transition">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="fade-in mb-16 text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl relative inline-block">
            My Projects
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary dark:bg-primary transform -translate-y-2"></span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80">
            Showcasing my innovative work in UI/UX design, AI/ML, and full-stack development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              ref={index < projectRefs.length ? projectRefs[index] : null} 
              className="project-card fade-in bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl theme-transition"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src={project.image} 
                  alt={project.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-primary dark:bg-primary text-white text-xs rounded-full">{project.category}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-poppins font-semibold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded theme-transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  className="inline-flex items-center text-primary dark:text-primary hover:underline"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div ref={buttonRef} className="mt-12 text-center fade-in">
          <Button 
            variant="outline"
            className="px-8 py-3 font-medium rounded-full border-2 border-primary dark:border-primary text-primary dark:text-primary hover:bg-primary hover:dark:bg-primary hover:text-white dark:hover:text-white transition-all duration-300"
          >
            <a href="#">View All Projects</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
