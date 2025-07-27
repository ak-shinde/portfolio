import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Mail, Instagram, MapPin, Briefcase, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyNoteRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stickyNote = stickyNoteRef.current;

    if (!section || !stickyNote) return;

    // Store trigger references for proper cleanup
    const triggers: ScrollTrigger[] = [];

    // Sticky note zoom effect
    const stickyNoteTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      animation: gsap.to(stickyNote, {
        scale: 1.2,
        rotation: 5,
        ease: "none"
      })
    });
    triggers.push(stickyNoteTrigger);

    // Form animation with fallback visibility
    if (formRef.current) {
      gsap.set(formRef.current, { opacity: 0, y: 50 });
      
      const formTrigger = ScrollTrigger.create({
        trigger: formRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        animation: gsap.to(formRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            // Ensure form is visible even if animation fails
            if (formRef.current) {
              gsap.set(formRef.current, { opacity: 1, y: 0 });
            }
          }
        })
      });
      triggers.push(formTrigger);
    }

    // Fallback: Ensure form is visible after a delay
    const fallbackTimer = setTimeout(() => {
      if (formRef.current) {
        gsap.set(formRef.current, { opacity: 1, y: 0 });
      }
    }, 2000);

    return () => {
      // Only kill this component's triggers
      triggers.forEach(trigger => trigger.kill());
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send your message.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration from Vercel environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      // Check if environment variables are configured
      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS environment variables not found');
        throw new Error('Email service not configured');
      }
      
      // Template parameters that match your EmailJS template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Akshay', // Your name
        to_email: 'akshay.r.shinde2696@gmail.com' // Your email
      };
      
      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Success feedback
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      
      // Add success animation
      if (submitBtnRef.current) {
        gsap.to(submitBtnRef.current, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      }
      
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Error feedback
      toast({
        title: "Failed to Send Message",
        description: "Something went wrong. Please try again or contact me directly at akshay.r.shinde2696@gmail.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background sticky note that zooms in */}
      <div 
        ref={stickyNoteRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-80 h-80 bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-soft transform rotate-12 opacity-50">
          <div className="p-6 h-full">
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-full h-3 bg-yellow-400/50 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-golden">
            Let's Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-warm space-y-6"
          >
            <div>
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-background/50"
              />
            </div>
            
            <div>
              <Input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-background/50"
              />
            </div>
            
            <div>
              <Textarea
                name="message"
                placeholder="Tell me about your project or just say hi!"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="bg-background/50 resize-none"
              />
            </div>
            
            <Button
              ref={submitBtnRef}
              type="submit"
              disabled={isSubmitting}
              className="w-full glow-effect hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-warm">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <span className="text-foreground">akshay.r.shinde2696@gmail.com</span>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <span className="text-foreground">Milpitas, California</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                  <span className="text-foreground">Open to work in SF Bay Area / Remotely</span>
                </div>
              </div>
            </div>

            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-warm">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Follow Me</h3>
              
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:glow-effect transition-all duration-300"
                  asChild
                >
                  <a href="https://github.com/ashindemm" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:glow-effect transition-all duration-300"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/akshay-shinde96/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:glow-effect transition-all duration-300"
                  asChild
                >
                  <a href="https://www.instagram.com/forever_axe/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:glow-effect transition-all duration-300"
                  asChild
                >
                  <a href="mailto:akshay.r.shinde2696@gmail.com">
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;