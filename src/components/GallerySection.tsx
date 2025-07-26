import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Camera, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'photography' | 'artwork'>('photography');

  const photography: GalleryItem[] = [
    { 
      id: 1, 
      title: "Mountain View", 
      category: "Landscape",
      image: "/gallery/IMG_1035.PNG"
    },
    { 
      id: 2, 
      title: "Urban Architecture", 
      category: "Architecture",
      image: "/gallery/1D5BFA86-57FA-4172-AB16-FB32C35DCA8A.PNG"
    },
    { 
      id: 3, 
      title: "Nature Study", 
      category: "Nature",
      image: "/gallery/22B52B07-59A8-46D3-A2EF-DB51EDEB5424.PNG"
    },
    { 
      id: 4, 
      title: "Creative Shot", 
      category: "Creative",
      image: "/gallery/3358AD43-F011-496A-A1C8-76BA240829ED.PNG"
    },
    { 
      id: 5, 
      title: "Portrait Study", 
      category: "Portrait",
      image: "/gallery/C2338154-1912-44E3-ADE9-DE6CD7593FDD.PNG"
    },
    { 
      id: 6, 
      title: "Artistic View", 
      category: "Art",
      image: "/gallery/1617FA8F-9606-4B7B-A4A3-E6059008AB27.PNG"
    },
  ];

  const artwork: GalleryItem[] = [
    { 
      id: 1, 
      title: "Digital Creation", 
      category: "Digital",
      image: "/gallery/7B6C42BD-B268-4000-8031-4C8C06B1B6EF.PNG"
    },
    { 
      id: 2, 
      title: "Concept Art", 
      category: "Concept",
      image: "/gallery/343AD404-14E1-4E58-A08F-EF5A6C78B681.PNG"
    },
    { 
      id: 3, 
      title: "Visual Design", 
      category: "Design",
      image: "/gallery/DB2938F4-9CC2-45D5-A9BF-CC2E3A847500.PNG"
    },
    { 
      id: 4, 
      title: "Creative Piece", 
      category: "Mixed Media",
      image: "/gallery/A8CC6485-6D1B-4047-BADA-B0AB75D106A7.PNG"
    },
    { 
      id: 5, 
      title: "Artistic Study", 
      category: "Traditional",
      image: "/gallery/B3B46A3F-A22A-4F8B-8CBC-B90A38908F9D.PNG"
    },
    { 
      id: 6, 
      title: "Digital Art", 
      category: "Digital",
      image: "/gallery/77CA4D0C-9C55-434C-8A91-DE7F1FDCE07C.PNG"
    },
  ];

  const currentGallery = activeTab === 'photography' ? photography : artwork;

  useEffect(() => {
    const section = sectionRef.current;
    const camera = cameraRef.current;

    if (!section || !camera) return;

    // Store trigger references for proper cleanup
    const triggers: ScrollTrigger[] = [];

    // Camera zoom effect
    const cameraTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      animation: gsap.to(camera, {
        scale: 1.3,
        ease: "none"
      })
    });
    triggers.push(cameraTrigger);

    return () => {
      // Only kill this component's triggers
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="gallery"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background camera that zooms in */}
      <div 
        ref={cameraRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-80 h-60 bg-gradient-to-br from-card to-secondary rounded-2xl shadow-soft opacity-10 transform -rotate-12">
          <div className="p-4 h-full">
            <div className="w-full h-32 bg-muted rounded-lg mb-4"></div>
            <div className="w-16 h-4 bg-muted rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-golden">
          Creative Gallery
        </h2>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-soft">
            <Button
              variant={activeTab === 'photography' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('photography')}
              className="rounded-full px-6"
            >
              <Camera className="w-4 h-4 mr-2" />
              Photography
            </Button>
            <Button
              variant={activeTab === 'artwork' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('artwork')}
              className="rounded-full px-6"
            >
              <Palette className="w-4 h-4 mr-2" />
              Artwork
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {currentGallery.map((item, index) => (
            <div
              key={`${activeTab}-${item.id}`}
              className="group cursor-pointer relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br from-card to-muted shadow-soft hover:shadow-golden transition-all duration-300"
              onClick={() => setSelectedImage(index)}
            >
              {/* Actual Image */}
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay with Image Info */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.category}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-primary rounded-full text-xs font-medium">
                    View
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 rounded-full bg-background/80 hover:bg-background"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>
              
              {/* Modal Image */}
              <div className="relative rounded-xl overflow-hidden shadow-warm bg-card/20 backdrop-blur-sm">
                <img 
                  src={currentGallery[selectedImage].image}
                  alt={currentGallery[selectedImage].title}
                  className="w-full max-h-[80vh] object-contain"
                />
                
                {/* Image Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {currentGallery[selectedImage].title}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {currentGallery[selectedImage].category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;