import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, Lightbulb, Download, Gamepad2, Play } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lampRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'gallery', 'contact'];
    const triggers: ScrollTrigger[] = [];

    sections.forEach((sectionId) => {
      const trigger = ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(sectionId),
        onEnterBack: () => setActiveSection(sectionId)
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle URL hash on page load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
    }
  }, []);

  useEffect(() => {
    // Animate lamp glow when dark mode changes
    if (lampRef.current && glowRef.current) {
      if (darkMode) {
        // Turn on lamp effect
        gsap.to(glowRef.current, {
          opacity: 0.8,
          scale: 1.2,
          duration: 0.8,
          ease: "power2.out"
        });
        gsap.to(lampRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      } else {
        // Turn off lamp effect
        gsap.to(glowRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in"
        });
        gsap.to(lampRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  }, [darkMode]);

  const handleLampToggle = () => {
    // Add a little bounce animation on click
    if (lampRef.current) {
      gsap.to(lampRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
    toggleDarkMode();
  };

  const navItems = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#gallery', label: 'Gallery', id: 'gallery' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    
    // Update URL hash
    window.history.pushState({}, '', `#${sectionId}`);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = () => {
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // You'll need to add your resume.pdf to the public folder
    link.download = 'Akshay_Shinde_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/0 backdrop-blur-md shadow-soft' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Gaming Portfolio Link */}
          <div 
            className="flex items-center gap-2 cursor-pointer group transition-all duration-300 hover:scale-105" 
            onClick={() => window.open('https://ak-shinde.github.io/Portfolio/game', '_blank')}
            title="Play the gamified version of my portfolio!"
          >
            <div className="relative">
              <Gamepad2 className="w-6 h-6 text-primary group-hover:text-golden transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse group-hover:bg-golden"></div>
            </div>
            <span className="text-sm font-bold text-primary group-hover:text-golden transition-colors duration-300 hidden sm:block">
              Play Portfolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`transition-all duration-200 relative ${
                  activeSection === item.id
                    ? 'text-white dark:text-primary font-semibold'
                    : 'text-primary hover:text-white dark:text-foreground dark:hover:text-primary'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                )}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Resume Download Button */}
            <Button
              onClick={handleResumeDownload}
              className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full transition-all duration-200 shadow-soft hover:shadow-golden"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
            
            {/* Enhanced Lamp Toggle */}
            <div className="relative">
              {/* Lamp Glow Background */}
              <div 
                ref={glowRef}
                className="absolute inset-0 rounded-full opacity-0 transition-all duration-500"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 220, 120, 0.3) 0%, rgba(255, 200, 80, 0.2) 50%, transparent 70%)',
                  filter: 'blur(4px)',
                  transform: 'scale(2)',
                  pointerEvents: 'none'
                }}
              />
              
              <Button
                ref={lampRef}
                variant="ghost"
                size="icon"
                onClick={handleLampToggle}
                className={`rounded-full relative z-10 transition-all duration-300 ${
                  darkMode 
                    ? 'bg-primary/20 text-primary shadow-lg shadow-primary/25' 
                    : 'hover:bg-primary/10'
                }`}
                style={{
                  boxShadow: darkMode ? '0 0 20px rgba(255, 220, 120, 0.3)' : 'none'
                }}
              >
                {darkMode ? (
                  <Lightbulb className={`h-5 w-5 transition-all duration-300 ${
                    darkMode ? 'text-amber-400 drop-shadow-sm' : ''
                  }`} />
                ) : (
                  <Lightbulb className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-soft">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block transition-all duration-200 relative ${
                    activeSection === item.id
                      ? 'text-white dark:text-primary font-semibold'
                      : 'text-primary hover:text-white dark:text-foreground dark:hover:text-primary'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute left-0 top-1/2 w-1 h-4 bg-primary rounded-full -translate-y-1/2"></div>
                  )}
                </a>
              ))}
              
              {/* Mobile Resume Download Button */}
              <Button
                onClick={() => {
                  handleResumeDownload();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full transition-all duration-200 shadow-soft hover:shadow-golden mt-4"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;