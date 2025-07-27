import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageBackgroundProps {
  darkMode: boolean;
}

const ImageBackground = ({ darkMode }: ImageBackgroundProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef<HTMLDivElement>(null);
  const nextImageRef = useRef<HTMLDivElement>(null);
  const currentImageKey = useRef<string>('home');

  useEffect(() => {
    const background = backgroundRef.current;
    const currentImage = currentImageRef.current;
    const nextImage = nextImageRef.current;

    if (!background || !currentImage || !nextImage) return;

    // Store trigger references for proper cleanup
    const triggers: ScrollTrigger[] = [];

    // Background image mapping
    const backgroundImages = {
      home: '/lovable-uploads/reference.png',
      about: '/lovable-uploads/about.PNG',
      skills: '/lovable-uploads/experience.PNG', // Use experience background for skills
      experience: '/lovable-uploads/experience.PNG',
      projects: '/lovable-uploads/experience.PNG', // Same as experience for projects
      gallery: '/lovable-uploads/gallery.PNG',
      contact: '/lovable-uploads/connect.PNG'
    };

    // Set initial background to hero
    gsap.set(currentImage, { 
      backgroundImage: `url(${backgroundImages.home})`,
      opacity: 1 
    });
    gsap.set(nextImage, { opacity: 0 });

    // Function to smoothly transition backgrounds
    const transitionToBackground = (imageKey: keyof typeof backgroundImages) => {
      // Skip if it's the same image key as currently displayed
      if (currentImageKey.current === imageKey) {
        return;
      }
      
      const newImageUrl = backgroundImages[imageKey];
      
      // Kill any existing animations to prevent conflicts
      gsap.killTweensOf([currentImage, nextImage]);
      
      // Ensure current image is fully visible during transition
      gsap.set(currentImage, { opacity: 1 });
      
      // Set the next image background and prepare for transition
      gsap.set(nextImage, { 
        backgroundImage: `url(${newImageUrl})`,
        opacity: 0 
      });

      // Update the current image key immediately to prevent duplicate calls
      currentImageKey.current = imageKey;

      // Fade in the new image on top of the current one
      gsap.to(nextImage, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // Swap the images instantly after fade completes
          gsap.set(currentImage, { 
            backgroundImage: `url(${newImageUrl})`,
            opacity: 1 
          });
          gsap.set(nextImage, { opacity: 0 });
        }
      });
    };

    // Hero section
    triggers.push(ScrollTrigger.create({
      trigger: "#home",
      start: "top center",
      end: "bottom center",
      onEnter: () => transitionToBackground('home'),
      onEnterBack: () => transitionToBackground('home')
    }));

    // About section
    triggers.push(ScrollTrigger.create({
      trigger: "#about",
      start: "top center",
      end: "bottom center",
      onEnter: () => transitionToBackground('about'),
      onEnterBack: () => transitionToBackground('about')
    }));

    // Skills section
    triggers.push(ScrollTrigger.create({
      trigger: "#skills",
      start: "top center",
      end: "bottom center",
      onEnter: () => transitionToBackground('skills'),
      onEnterBack: () => transitionToBackground('skills')
    }));

    // Timeline section (experience background)
    triggers.push(ScrollTrigger.create({
      trigger: "#experience",
      start: "top center", 
      end: "bottom center",
      onEnter: () => transitionToBackground('experience'),
      onEnterBack: () => transitionToBackground('experience')
    }));

    // Projects section (uses experience background)
    triggers.push(ScrollTrigger.create({
      trigger: "#projects",
      start: "top center",
      end: "bottom center", 
      onEnter: () => transitionToBackground('projects'),
      onEnterBack: () => transitionToBackground('projects')
    }));

    // Gallery section
    triggers.push(ScrollTrigger.create({
      trigger: "#gallery",
      start: "top center",
      end: "bottom center",
      onEnter: () => transitionToBackground('gallery'),
      onEnterBack: () => transitionToBackground('gallery')
    }));

    // Contact section
    triggers.push(ScrollTrigger.create({
      trigger: "#contact", 
      start: "top center",
      end: "bottom center",
      onEnter: () => transitionToBackground('contact'),
      onEnterBack: () => transitionToBackground('contact')
    }));

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={backgroundRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Current background image */}
      <div 
        ref={currentImageRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/50 transition-all duration-500"></div>
      </div>

      {/* Next background image for smooth transitions */}
      <div 
        ref={nextImageRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/50 transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default ImageBackground;