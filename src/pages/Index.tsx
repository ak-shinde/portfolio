import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TimelineSection from '@/components/TimelineSection';
import ProjectsSection from '@/components/ProjectsSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ImageBackground from '@/components/ImageBackground';
import { Analytics } from "@vercel/analytics/react"

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme based on system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && systemDark);
    setDarkMode(shouldUseDark);
    
    // Apply dark mode class to document
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  // ScrollTrigger refresh and cleanup
  useEffect(() => {
    // Refresh ScrollTrigger after layout changes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoading]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Save preference and apply to document
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Refresh ScrollTrigger after loading screen completes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Reference Image Background */}
      <ImageBackground darkMode={darkMode} />
      
      {/* Content overlay */}
      <div className="relative z-10">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main>
          <HeroSection />
          <AboutSection />
          <TimelineSection />
          <ProjectsSection />
          <GallerySection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
      <Analytics />
    </div>
  );
};

export default Index;
