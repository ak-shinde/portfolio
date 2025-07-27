import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Cloud, Wrench, Smartphone, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number; // 1-5
  icon?: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: string;
}

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-blue-500 to-purple-600",
      skills: [
        { name: "Python", level: 5 },
        { name: "JavaScript", level: 5 },
        { name: "TypeScript", level: 5 },
        { name: "Java", level: 4 },
        { name: "C", level: 3 },
        { name: "C++", level: 3 },
        { name: "PHP", level: 2 },
        { name: "Ruby on Rails", level: 2 },
      ]
    },
    {
      title: "Frontend & Mobile",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-green-500 to-teal-600",
      skills: [
        { name: "React", level: 5 },
        { name: "Angular", level: 4 },
        { name: "SwiftUI", level: 3 },
        { name: "HTML/CSS", level: 5 },
        { name: "D3.js", level: 4 },
        { name: "Three.js", level: 3 },
        { name: "Tailwind CSS", level: 4 },
        { name: "Next.js", level: 3 },
        { name: "Vite", level: 3 },
      ]
    },
    {
      title: "Backend & Databases",
      icon: <Database className="w-6 h-6" />,
      color: "from-orange-500 to-red-600",
      skills: [
        { name: "Django", level: 5 },
        { name: "REST APIs", level: 5 },
        { name: "Spring Boot", level: 4 },
        { name: "GraphQL", level: 3 },
        { name: "MySQL", level: 5 },
        { name: "PostgreSQL", level: 5 },
        { name: "MongoDB", level: 4 },
        { name: "Hadoop", level: 3 },
        { name: "Redis", level: 4 },
      ]
    },
    {
      title: "AI Tools",
      icon: <Brain className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
      skills: [
        { name: "Jupyter Notebooks", level: 4 },
        { name: "Claude CLI", level: 4 },
        { name: "OpenAI ChatGPT", level: 3 },
        { name: "Gemini API", level: 3 },
        { name: "Facebook Spyder", level: 3 },
        { name: "Vercel", level: 4 },
        { name: "Loveable", level: 3 },
        { name: "Glean", level: 4 },
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-600",
      skills: [
        { name: "Docker", level: 4 },
        { name: "GCP", level: 4 },
        { name: "AWS (S3)", level: 3 },
        { name: "Linux", level: 4 },
        { name: "CI/CD", level: 3 },
      ]
    },
    {
      title: "Development Tools",
      icon: <Wrench className="w-6 h-6" />,
      color: "from-amber-500 to-orange-600",
      skills: [
        { name: "Git", level: 5 },
        { name: "Jira", level: 4 },
        { name: "Figma", level: 4 },
        { name: "Balsamiq", level: 4 },
        { name: "Postman", level: 5 },
        { name: "Wowza", level: 3 },
        { name: "ArcGIS", level: 3 },
        { name: "BrowserStack", level: 4 },
        { name: "Lambdatest", level: 4 },
      ]
    }
  ];

  useEffect(() => {
    if (!skillsRef.current) return;

    const cards = skillsRef.current.querySelectorAll('.skill-card');
    const progressBars = skillsRef.current.querySelectorAll('.progress-bar');

    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 60,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.1
        }
      );
    });

    // // Animate progress bars
    // progressBars.forEach((bar) => {
    //   const width = bar.getAttribute('data-width');
    //   gsap.fromTo(bar,
    //     { width: '0%' },
    //     {
    //       width: `${width}%`,
    //       duration: 0.5,
    //       ease: "power2.out",
    //       scrollTrigger: {
    //         trigger: bar,
    //         start: "top 90%",
    //         toggleActions: "play none none none"
    //       }
    //     }
    //   );
    // });

  }, []);

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-full ${
          i < level ? 'bg-primary' : 'bg-muted'
        } transition-all duration-300`}
      />
    ));
  };

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-golden/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-golden"
            style={{ 
              textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6)' 
            }}
          >
            Technical Skills
          </h2>
        </div>

        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="skill-card bg-card/80 backdrop-blur-md rounded-2xl p-6 shadow-soft border border-white/10 hover:shadow-golden transition-all duration-300 hover:scale-105"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {skill.name}
                      </span>
                      <div className="flex gap-1">
                        {renderStars(skill.level)}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                      <div
                        className={`progress-bar h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-300 group-hover:brightness-110`}
                        data-width={skill.level * 20}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 