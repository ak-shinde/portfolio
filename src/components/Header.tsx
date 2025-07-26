import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, Lightbulb } from 'lucide-react';
import { gsap } from 'gsap';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lampRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#timeline', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

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
          {/* Logo */}
          <div className="text-2xl font-bold text-golden cursor-pointer" onClick={() => window.open('https://ak-shinde.github.io/Portfolio/game', '_blank')}>
            AS
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-primary hover:text-white dark:text-foreground dark:hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
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
                  className="block text-primary hover:text-white dark:text-foreground dark:hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;