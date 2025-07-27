import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate text appearance
    tl.fromTo(textRef.current, 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Text changes during loading
    const textEl = textRef.current;
    if (textEl) {
      setTimeout(() => textEl.textContent = "Brewing creativity...", 800);
      setTimeout(() => textEl.textContent = "Almost ready...", 2000);
    }

    // Fade out preloader after animation completes
    setTimeout(() => {
      tl.to(preloaderRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          onLoadingComplete();
        }
      });
    }, 4000);

    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: '#ffefdb' }}
    >
      <div className="text-center">
        {/* Exact GitHub Repository Coffee Animation */}
        <div className="cup">
          <span className="steam"></span>
          <span className="steam"></span>
          <span className="steam"></span>
          <div className="cup-handle"></div>
        </div>

        {/* Loading Text */}
        <p 
          ref={textRef}
          className="text-xl font-medium mt-8"
          style={{ 
            color: '#352a22',
            textShadow: '1px 1px 2px rgba(255,255,255,0.5)' 
          }}
        >
          Grabbing coffee...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;