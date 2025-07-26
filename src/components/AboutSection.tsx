import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sketchbookRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sketchbook = sketchbookRef.current;
    const content = contentRef.current;

    if (!section || !sketchbook || !content) return;

    // Store trigger references for proper cleanup
    const triggers: ScrollTrigger[] = [];

    // Parallax zoom effect on sketchbook
    const sketchbookTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      animation: gsap.to(sketchbook, {
        scale: 1.2,
        ease: "none"
      })
    });
    triggers.push(sketchbookTrigger);

    // Content fade in with fallback visibility
    gsap.set(content, { opacity: 0, y: 100 });
    
    const contentTrigger = ScrollTrigger.create({
      trigger: content,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      animation: gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          // Ensure content is visible even if animation fails
          gsap.set(content, { opacity: 1, y: 0 });
        }
      })
    });
    triggers.push(contentTrigger);

    // Fallback: Ensure content is visible after a delay
    const fallbackTimer = setTimeout(() => {
      if (content) {
        gsap.set(content, { opacity: 1, y: 0 });
      }
    }, 2000);

    return () => {
      // Only kill this component's triggers
      triggers.forEach(trigger => trigger.kill());
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background sketchbook that zooms in */}
      <div 
        ref={sketchbookRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-96 h-96 bg-gradient-to-br from-card to-muted rounded-lg shadow-soft transform rotate-12 from-yellow-200 to-yellow-300 opacity-50">
          <div className="p-8 h-full flex flex-col">
            <div className="border-b border-border mb-4 pb-2">
              <div className="w-full h-2 bg-muted rounded"></div>
            </div>
            <div className="space-y-3 flex-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex space-x-2">
                  <div className="w-4 h-4 bg-muted rounded-full"></div>
                  <div className="flex-1 h-2 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-golden drop-shadow-lg">
          About Me
        </h2>
        
        <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-warm border border-white/10">
          <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
            Hey there! I'm Akshay Shinde, a passionate full-stack developer with over 5 years of experience 
            crafting digital experiences. My journey began with a simple fascination for how websites work, 
            and it's evolved into a deep love for creating beautiful, functional applications.
          </p>
          
          <p className="text-lg md:text-xl leading-relaxed text-foreground mt-6 font-medium">
            When I'm not coding, you'll find me sketching new ideas in my notebook, capturing moments through 
            photography, strumming my guitar, or exploring nature on hiking trails. These creative pursuits 
            fuel my technical work, bringing a unique perspective to every project I touch.
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Coffee Cups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Passion</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;