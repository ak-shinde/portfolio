import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Promotion {
  year: string;
  title: string;
  description: string;
}

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  current?: boolean;
  promotions?: Promotion[];
}

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineData: TimelineItem[] = [
    {
      year: "2023",
      title: "Software Engineer II",
      company: "Multimedia",
      description: "Developing and maintaining video streaming services using modern technologies",
      current: true
    },
    {
      year: "2022",
      title: "Research Student Developer",
      company: "USC Lab of NeuroImaging",
      description: "Re-architected data harmonization platform for the NIH-funded DABI initiative"
    },
    {
      year: "2022",
      title: "Software Engineer Intern",
      company: "Twilio",
      description: "Streamlined 25+ Studio console widgets' creation"
    },
    {
      year: "2021",
      title: "Master's Degree",
      company: "University of Southern California",
      description: "Computer Science - GPA 3.9"
    },
    {
      year: "2018",
      title: "Product Developer",
      company: "BMC Software",
      description: "Worked on TrueSight Network Automation team",
    },
    {
      year: "2014",
      title: "Bachelor's Degree",
      company: "Pune Institute of Computer Technology",
      description: "Information Technology - GPA 3.82"
    },
  ];

  useEffect(() => {
    if (!timelineRef.current) return;

    // Animate timeline items on scroll
    const items = timelineRef.current.querySelectorAll('.timeline-item');
    
    items.forEach((item, index) => {
      gsap.fromTo(item, 
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate the timeline line
    gsap.fromTo('.timeline-line',
      {
        scaleY: 0,
        transformOrigin: "top center"
      },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  return (
    <section 
      id="timeline"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-20"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-golden drop-shadow-lg">
          My Journey
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-accent to-primary h-full rounded-full shadow-lg"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={item.year}
                className={`timeline-item flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-background/10 backdrop-blur-md rounded-2xl p-6 shadow-soft border border-white/20 hover:bg-background/20 hover:shadow-golden transition-all duration-300">
                    <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-2xl font-bold text-primary">{item.year}</span>
                      {item.current && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full animate-pulse">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {item.company}
                    </p>
                    <p className="text-gray-200 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="relative flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full border-4 border-background shadow-lg z-10 hover:scale-125 transition-transform duration-300 ${item.current ? 'bg-primary' : ''}`}>
                    <div className={`w-full h-full rounded-full animate-pulse ${item.current ? 'bg-gradient-to-br from-primary to-accent' : ''}`}></div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection; 