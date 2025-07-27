import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      name: "Codeowners Plus",
      description: "Feature-rich alternative to GitHub Code Owners for monoliths and mono-repos",
      tech: ["Go", "Javascript", "Docker", "Shell"],
      folder: "folder-1",
      code: "https://github.com/multimediallc/codeowners-plus",
    },
    {
      id: 2,
      name: "SemSe",
      description: "A Multilingual Semantic Search Application ",
      tech: ["Python", "Facebook Spyder", "NLP", "LLM"],
      folder: "folder-2",
      code: "https://github.com/ashindemm/SemSe",
    },
    {
      id: 3,
      name: "GO game AI",
      description: "AI bot to play a mini 5x5 GO game",
      tech: ["Python", "Jupyter Notebook", "Pandas"],
      folder: "folder-3",
      code: "https://github.com/ashindemm/GO-AI",
    },
    {
      id: 4,
      name: "Yelp Review - iOS App",
      description: "A iOS app that allows users to view and write reviews for businesses",
      tech: ["Swift", "SwiftUI", "Core Data", "UIKit"],
      folder: "folder-4",
      code: "https://github.com/ashindemm/SwiftUI---Yelp-Review-App",
    },
    {
      id: 5,
      name: "Neural Network for Handwriting Prediction",
      description: "Neural network for handwriting prediction on MNIST dataset.",
      tech: ["Python", "TensorFlow", "Keras", "MNIST", "Neural Network"],
      folder: "folder-5",
      code: "https://github.com/ashindemm/Neural-Network-for-handrwiting-prediction",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const spline = splineRef.current;

    if (!section || !spline) return;

    // Store trigger references for proper cleanup
    const triggers: ScrollTrigger[] = [];

    // 3D rotation effect
    const rotationTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      animation: gsap.to(spline, {
        rotationY: 15,
        rotationX: 5,
        ease: "none"
      })
    });
    triggers.push(rotationTrigger);

    return () => {
      // Only kill this component's triggers
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      <div 
        ref={splineRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-6"
      >
        <h2 
          className="text-4xl md:text-6xl font-bold mb-12 text-center text-golden"
          style={{ 
            textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6)' 
          }}
        >
          My Projects
        </h2>

        {/* Project Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group cursor-pointer h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-full bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-soft hover:shadow-golden transition-all duration-300 hover:scale-105 flex flex-col">
                {/* Content that can grow */}
                <div className="flex-grow">
                  {/* Folder Icon */}
                  <div className="w-16 h-12 bg-gradient-to-br from-primary to-accent rounded-t-lg mb-4 relative">
                    <div className="absolute top-0 right-2 w-4 h-2 bg-primary rounded-b-sm"></div>
                  </div>

                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons fixed at bottom */}
                <div className="flex space-x-2 mt-auto">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => window.open(project.code, '_blank')}>
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </Button>
                  {/* {project.demo && (
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </Button>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;