import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Ensure elements are visible if animations fail
    const ensureVisibility = () => {
      if (headlineRef.current) headlineRef.current.style.opacity = '1';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      if (ctaRef.current) ctaRef.current.style.opacity = '1';
      if (scrollIndicatorRef.current) scrollIndicatorRef.current.style.opacity = '1';
    };

    // Hero entrance animations with fallback
    tl.from(headlineRef.current, {
      opacity: 0,
      y: 50,
      rotationX: 45,
      duration: 1,
      ease: "power3.out",
      onComplete: () => {
        if (headlineRef.current) headlineRef.current.style.opacity = '1';
      }
    })
    .from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      }
    }, "-=0.5")
    .from(ctaRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "back.out(1.7)",
      onComplete: () => {
        if (ctaRef.current) ctaRef.current.style.opacity = '1';
      }
    }, "-=0.3")
    .from(scrollIndicatorRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        if (scrollIndicatorRef.current) scrollIndicatorRef.current.style.opacity = '1';
      }
    }, "-=0.2");

    // Fallback timeout to ensure visibility
    setTimeout(ensureVisibility, 3000);

    // Floating orbs animation
    const orbs = heroRef.current?.querySelectorAll('.floating-orb');
    orbs?.forEach((orb, i) => {
      gsap.to(orb, {
        y: -20,
        rotation: 360,
        duration: 4 + i,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.5
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleCTAClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="floating-orb absolute w-4 h-4 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
        
        {/* Gradient Overlays */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-accent/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-7xl font-bold mb-6 opacity-0 text-white"
          style={{ 
            textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6)' 
          }}
        >
          Hi, I'm{' '}
          <span className="text-golden bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-sm">
            Akshay
          </span>
          <br />
          <span className="text-3xl md:text-5xl font-light text-white">
            Full-stack Developer
          </span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto opacity-0"
          style={{ 
            textShadow: '1px 1px 6px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' 
          }}
        >
          Crafting digital experiences with 5+ years of passion.<br />
          From code to art, I bring ideas to life.
        </p>

        <Button
          ref={ctaRef}
          onClick={handleCTAClick}
          className="glow-effect text-lg px-8 py-6 rounded-full hover:scale-105 transition-all duration-300 opacity-0"
          size="lg"
        >
          Let's Build Together
        </Button>
      </div>

      {/* Floating Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 z-20"
      >
        <div className="flex flex-col items-center cursor-pointer group" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <span 
            className="text-sm text-white/90 group-hover:text-primary mb-2 transition-colors duration-200"
            style={{ 
              textShadow: '1px 1px 4px rgba(0,0,0,0.8)' 
            }}
          >
            Scroll to explore
          </span>
          <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/30 group-hover:bg-primary/40 group-hover:border-primary/50 transition-all duration-300">
            <ChevronDown className="h-5 w-5 text-white/80 group-hover:text-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;