import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Store trigger references for proper cleanup
    const triggers: ScrollTrigger[] = [];

    // Animate footer entrance
    gsap.set(footer, { opacity: 0, y: 30 });
    
    const footerTrigger = ScrollTrigger.create({
      trigger: footer,
      start: "top 95%",
      toggleActions: "play none none none",
      animation: gsap.to(footer, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          // Ensure footer stays visible
          gsap.set(footer, { opacity: 1, y: 0 });
        }
      })
    });
    triggers.push(footerTrigger);


    // Fallback: Ensure footer is visible after a delay
    const fallbackTimer = setTimeout(() => {
      if (footer) {
        gsap.set(footer, { opacity: 1, y: 0 });
      }
    }, 2000);

    return () => {
      // Only kill this component's triggers
      triggers.forEach(trigger => trigger.kill());
      clearTimeout(fallbackTimer);
    };
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative bg-card/10 backdrop-blur-sm border-t border-border overflow-hidden mt-auto"
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-4">
        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-muted-foreground flex flex-wrap items-center justify-center gap-1 md:gap-2 text-sm md:text-base">
            <span>© 2025 Akshay Shinde.</span>
            <span className="flex items-center gap-1">
              Made with 
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              and lots of coffee
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;