import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Layout from "@/components/Layout";
import { useCMS } from "@/contexts/CMSContext";

const logoUrl = "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913043/ruby_black-01_auqws2.png";

// Type for image display options
export type ImageObjectFit = "cover" | "contain" | "fill" | "none";
export type ImageOrientation = "landscape" | "portrait" | "square";

// Helper function to get object-fit class
const getObjectFitClass = (fit?: ImageObjectFit): string => {
  switch (fit) {
    case "cover": return "object-cover";
    case "contain": return "object-contain";
    case "fill": return "object-fill";
    case "none": return "object-none";
    default: return "object-cover";
  }
};

// Helper function to get aspect ratio class
const getAspectRatioClass = (orientation?: ImageOrientation): string => {
  switch (orientation) {
    case "landscape": return "aspect-video";
    case "portrait": return "aspect-[9/16]";
    case "square": return "aspect-square";
    default: return "aspect-video";
  }
};

// About photos from about.txt
const aboutPhotos = [
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913656/IMG_2100_toyssn.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913644/IMG_4139_cypqb0.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913646/IMG_4238_mu5ur2.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913634/IMG_7737_jixu0f.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913631/IMG_7732_fhk41u.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913621/IMG_3772_ytmg8f.png",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913621/IMG_3509_guvcwz.jpg",
];

// Default hero slides for about page
const defaultHeroSlides = [
  {
    id: "hero-1",
    videoUrl: "https://res.cloudinary.com/dhb7y3wk3/video/upload/v1770912093/fitsum_usmvsl.mp4",
    fallbackImage: aboutPhotos[0],
    title: "About Us",
    description: "Who We Are",
  },
  {
    id: "hero-2",
    videoUrl: "https://res.cloudinary.com/dhb7y3wk3/video/upload/v1770919216/0212_ax1hc5.mp4",
    fallbackImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910850/DSC06114_s1emfc.jpg",
    title: "The Coffee Project",
    description: "Our Latest Project",
  },
];

// Default testimonials
const defaultTestimonials = [
  {
    id: 1,
    name: "Qare The Mask",
    quote: "Introducing the visionary behind the lens, our esteemed director and videographer! My friend Fitsum (Jay-z). With a keen eye for detail and a passion for storytelling, he brings a unique creative flair to every project he undertakes. Born with an innate talent for visual arts, he honed his skills through years of dedicated practice and professional training. His extensive experience in the field has earned him a reputation of excellence, with his work being highly sought after by artists, musicians, and brands alike. As a collaborator, he is a joy to work with. His friendly and approachable demeanor puts everyone at ease, allowing him to effortlessly capture the essence of his subjects and bring their vision to life. He is a master of his craft, always pushing the boundaries of what's possible and delivering breathtaking results that leave audiences in awe. In particular, his passion for music has led him to create some of the most stunning music videos of our time. With a deep understanding of the power of music and visuals, he has produced and directed four unforgettable videos for me (Qare The Mask), each one a masterpiece in its own right. With a portfolio that spans across various genres and mediums, he is a versatile and dynamic force in the world of videography. I am honored to have him as a friend and videographer, and I am confident that his exceptional talent and unwavering commitment to excellence will continue to set him apart as one of the most talented directors in the industry. Keep growing and keep doing what you do. Thank you, my friend.",
  },
  {
    id: 2,
    name: "Mukhtar AKA Mo Fami",
    quote: "My name is Mukhtar, also known as Mo Fami. I met Fitsum Beza for the first time on November 16, 2022. He welcomed me very well, and I enjoyed working with him. He produced several music videos for me. The first song he worked on, 'CALL ME,' became viral on social media, especially on TikTok. A few months later, that song gained 1.8 million views on YouTube. I am very grateful for the wonderful work he has done with me. Personally, he is a very humble and active person. I hope we will work together many more times again.",
  },
  {
    id: 3,
    name: "Rafary (Artist Singer from Djibouti)",
    quote: "Hey, my name is Rafary, an artist singer from Djibouti. I met Jay-z (Fitsum Beza) for the first time when he made a video for my friend MOFAMI. After that, I liked his work and how he makes videos very professionally in Ethiopia. After he made me one video collaboration with my friends, I can say Ruby Pictures is the best videographer in Addis Ababa. I'm happy to be friends with you. Thank you for everything, bro.",
  },
];

// Lazy Image Component with better loading
const LazyImage = ({
  src,
  alt,
  index,
  className = "",
  objectFit = "cover",
  orientation = "landscape",
  aspectClass = "aspect-square",
  objectPosition = "center"
}: {
  src: string;
  alt: string;
  index: number;
  className?: string;
  objectFit?: ImageObjectFit;
  orientation?: ImageOrientation;
  aspectClass?: string;
  objectPosition?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" }
    );

    const imgElement = document.getElementById(`about-photo-${index}`);
    if (imgElement) observer.observe(imgElement);

    return () => observer.disconnect();
  }, [index]);

  if (hasError) {
    return (
      <div className="aspect-square bg-muted flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Image unavailable</p>
      </div>
    );
  }

  return (
    <div id={`about-photo-${index}`} className={`${aspectClass} bg-muted overflow-hidden ${className}`}>
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full ${getObjectFitClass(objectFit)} object-${objectPosition}`}
        />
      )}
      {!isLoaded && (
        <div className="w-full h-full bg-muted animate-pulse" />
      )}
    </div>
  );
};

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Get data from CMS
  const { aboutProfile, getAboutProfile, heroSlides: cmsHeroSlides, getHeroSlides, testimonials: cmsTestimonials, clients, getClients, aboutPageContent: cmsAboutPage, getAboutPageContent } = useCMS();

  // Get about page content from CMS - safely handle empty object
  const rawPageContent = getAboutPageContent();
  const pageContent = rawPageContent && Object.keys(rawPageContent).length > 0 ? rawPageContent : null;

  // Get hero slides from CMS or use default
  const heroSlidesData = cmsHeroSlides.length > 0 
    ? cmsHeroSlides.map(s => ({
        id: s._id,
        videoUrl: s.videoUrl || '',
        fallbackImage: s.fallbackImage,
        title: s.title,
        description: s.description || '',
      }))
    : defaultHeroSlides;

  // Get testimonials from CMS or use default
  const testimonialsData = cmsTestimonials.length > 0 
    ? cmsTestimonials.map((t, i) => ({
        id: i + 1,
        name: t.name,
        quote: t.quote,
      }))
    : defaultTestimonials;

  // Get clients from CMS
  const clientsData = getClients();

  // Get about profile
  const profileData = getAboutProfile();
  
  // Get photos from CMS or use default
  const galleryPhotos = pageContent?.aboutPhotos?.length > 0 ? pageContent.aboutPhotos : aboutPhotos;

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlidesData.length);
  }, [isTransitioning]);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlidesData.length) % heroSlidesData.length);
  }, [isTransitioning]);

  // Handle video load
  const handleVideoLoad = useCallback((index: number) => {
    setLoadedVideos((prev) => new Set([...prev, index]));
    setIsTransitioning(false);
  }, []);

  // Handle video error - use fallback
  const handleVideoError = useCallback((index: number) => {
    setLoadedVideos((prev) => new Set([...prev, index]));
    setIsTransitioning(false);
  }, []);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  // Reset transition state after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Auto-advance testimonials every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // Lightbox functions
  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <Layout>
      {/* Page header with carousel */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <AnimatePresence mode="wait">
          {heroSlidesData.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 overflow-hidden">
                  {loadedVideos.has(index) ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover scale-150"
                    >
                      <source src={slide.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={slide.fallbackImage}
                      alt={slide.title}
                      className="w-full h-full object-cover scale-150"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/80" />
                </div>

                {!loadedVideos.has(index) && (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover scale-150 opacity-0"
                    onLoadedData={() => handleVideoLoad(index)}
                    onError={() => handleVideoError(index)}
                  >
                    <source src={slide.videoUrl} type="video/mp4" />
                  </video>
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="relative z-10 px-6 md:px-12 pb-12 w-full max-w-7xl mx-auto">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-300 mb-2">
              {heroSlidesData[currentSlide].description}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-white">
              {heroSlidesData[currentSlide].title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* About content */}
      <section className="py-0">
        {pageContent?.aboutLayout === 'image-above' ? (
          <>
            {/* Full-bleed cinematic image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full overflow-hidden"
            >
              <LazyImage
                src={pageContent?.aboutImage || aboutPhotos[1]}
                alt="Ruby Pictures"
                index={10}
                aspectClass="aspect-[16/9]"
                objectFit="cover"
                objectPosition="center"
              />
            </motion.div>
            <div className="px-6 md:px-12 max-w-6xl mx-auto py-20">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="space-y-6 text-foreground/80 text-lg leading-relaxed max-w-3xl"
              >
                <div className="w-10 h-px bg-ruby mb-6" />
                {pageContent?.aboutContent ? (
                  <div className="whitespace-pre-line">
                    {pageContent.aboutContent.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p>Ruby Pictures is a dynamic film production company dedicated to crafting compelling visual stories that resonate with audiences worldwide.</p>
                )}
              </motion.div>
            </div>
          </>
        ) : (
          // Side-by-side: image takes full left half, text on right
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="overflow-hidden aspect-[4/5] md:aspect-auto"
            >
              <LazyImage
                src={pageContent?.aboutImage || aboutPhotos[1]}
                alt="Ruby Pictures"
                index={10}
                aspectClass="w-full h-full"
                objectFit="cover"
                objectPosition="center"
                className="hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col justify-center px-10 md:px-16 py-16 space-y-6"
            >
              <div className="w-10 h-px bg-ruby" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-ruby">Our Story</p>
              <div className="text-foreground/75 text-lg leading-relaxed space-y-4">
                {pageContent?.aboutContent ? (
                  <div className="whitespace-pre-line">
                    {pageContent.aboutContent.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p>Ruby Pictures is a dynamic film production company dedicated to crafting compelling visual stories that resonate with audiences worldwide.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* CEO Section - Fitsum Beza */}
      <section className="py-24 border-t border-border bg-secondary/30">
        <div className="px-6 md:px-12 max-w-6xl mx-auto">
          {pageContent?.ceoLayout === 'image-above' ? (
            // Image above text layout
            <div className="space-y-8">
              <div className="overflow-hidden">
                <LazyImage
                  src={pageContent?.ceoImage || aboutPhotos[0]}
                  alt="Fitsum Beza - CEO of Ruby Pictures"
                  index={20}
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                  objectFit="cover"
                  aspectClass="aspect-[3/4]"
                  objectPosition="top"
                />
              </div>
              <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-ruby mb-2">{pageContent?.ceoTitle || 'Founder & CEO'}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">{pageContent?.ceoName || 'Fitsum Beza'}</h2>
                {pageContent?.ceoContent ? (
                  <div className="whitespace-pre-line">
                    {pageContent.ceoContent.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-foreground/70">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="text-foreground/70">
                      I am a passionate and creative Ethiopian young cinematographer dedicated to capturing captivating stories through the lens of my camera.
                    </p>
                    <p className="text-foreground/70">
                      Growing up in Ethiopia, a country rich in culture, history, and natural beauty, I have always been drawn to visually capturing the essence of my surroundings. From the vibrant colors of traditional Ethiopian festivals to the breathtaking landscapes that stretch across the country, I strive to create compelling and immersive experiences that leave a lasting impact on the viewer.
                    </p>
                    <p className="text-foreground/70">
                      I believe in the power of film to bridge gaps, break barriers, and inspire change. Through my work, I aim to shed light on important social and cultural issues, amplifying voices that deserve to be heard.
                    </p>
                    <p className="text-foreground/70">
                      In my portfolio, you will find a collection of my cinematography work, showcasing my ability to capture emotions, create visual narratives, and transport viewers to different worlds. From evocative lighting and composition to seamless camera movements, I aim to create a cinematic experience that resonates with the audience on a profound level.
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            // Side by side layout
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 space-y-6 text-foreground/80 text-lg leading-relaxed">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-ruby mb-2">{pageContent?.ceoTitle || 'Founder & CEO'}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">{pageContent?.ceoName || 'Fitsum Beza'}</h2>
                {pageContent?.ceoContent ? (
                  <div className="whitespace-pre-line">
                    {pageContent.ceoContent.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-foreground/70">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="text-foreground/70">
                      I am a passionate and creative Ethiopian young cinematographer dedicated to capturing captivating stories through the lens of my camera.
                    </p>
                    <p className="text-foreground/70">
                      Growing up in Ethiopia, a country rich in culture, history, and natural beauty, I have always been drawn to visually capturing the essence of my surroundings. From the vibrant colors of traditional Ethiopian festivals to the breathtaking landscapes that stretch across the country, I strive to create compelling and immersive experiences that leave a lasting impact on the viewer.
                    </p>
                    <p className="text-foreground/70">
                      I believe in the power of film to bridge gaps, break barriers, and inspire change. Through my work, I aim to shed light on important social and cultural issues, amplifying voices that deserve to be heard.
                    </p>
                    <p className="text-foreground/70">
                      In my portfolio, you will find a collection of my cinematography work, showcasing my ability to capture emotions, create visual narratives, and transport viewers to different worlds. From evocative lighting and composition to seamless camera movements, I aim to create a cinematic experience that resonates with the audience on a profound level.
                    </p>
                  </>
                )}
              </div>
              <div className="order-1 md:order-2 overflow-hidden">
                <LazyImage
                  src={pageContent?.ceoImage || aboutPhotos[0]}
                  alt="Fitsum Beza - CEO of Ruby Pictures"
                  index={20}
                  className="grayscale hover:grayscale-0 transition-all duration-500 rounded-lg"
                  objectFit="cover"
                  aspectClass="aspect-[3/4]"
                  objectPosition="top"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Photos Gallery with lazy loading */}
      <section className="py-24 border-t border-border">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Gallery</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">Our Photos</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(pageContent?.aboutPhotos?.length > 0 ? pageContent.aboutPhotos : aboutPhotos).map((photo, index) => (
              <motion.div
                key={photo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className={`overflow-hidden ${getAspectRatioClass(pageContent?.aboutPhotosOrientation)}`}>
                  <LazyImage 
                    src={photo} 
                    alt={`About photo ${index + 1}`} 
                    index={index} 
                    className="grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    objectFit={pageContent?.aboutPhotosObjectFit as ImageObjectFit || "cover"}
                    orientation={pageContent?.aboutPhotosOrientation as ImageOrientation || "landscape"}
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Small */}
      <section className="py-12 border-t border-border bg-secondary/20">
        <div className="px-6 md:px-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className="text-sm md:text-base leading-relaxed text-foreground/70 italic mb-3 line-clamp-3">
                  "{testimonialsData[currentTestimonial].quote}"
                </blockquote>
                <cite className="not-italic">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    — {testimonialsData[currentTestimonial].name}
                  </p>
                </cite>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial navigation dots */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-ruby w-4"
                      : "bg-border hover:bg-ruby/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clients Section - Black and White until hover */}
      {clientsData.length > 0 && (
        <section className="py-24 border-t border-border">
          <div className="px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Partners</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">Our Clients</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {clientsData.map((client) => (
                <a
                  key={client._id}
                  href={client.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-500"
                >
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-16 max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-display text-xl font-bold">{client.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="py-24 border-t border-border">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {(pageContent?.stats?.length > 0 ? pageContent.stats : [
              { label: "Projects Completed", value: "50+" },
              { label: "Years Experience", value: "5+" },
              { label: "Happy Clients", value: "30+" },
              { label: "Awards Won", value: "8" },
            ]).map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-ruby mb-2">{stat.value}</p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 border-t border-border">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Our Mission</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {pageContent?.mission || '"To Shine Your Own Light Through Film" — creating cinematic experiences that illuminate stories, celebrate culture, and connect audiences across the globe.'}
          </h2>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 border-t border-border">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12">What We Do</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(pageContent?.services?.length > 0 ? pageContent.services : [
              { title: "Feature Films", description: "Full-length narrative films that tell compelling stories with cinematic excellence." },
              { title: "Documentaries", description: "Informative and inspiring documentaries that explore real stories and subjects." },
              { title: "Commercials", description: "High-impact advertising content that captures attention and drives results." },
              { title: "Music Videos", description: "Creative visual interpretations that bring music to life through stunning imagery." },
              { title: "TV Content", description: "Engaging television programming designed for broadcast and streaming platforms." },
              { title: "Photography", description: "Professional photography services for portfolios, events, and commercial needs." },
            ]).map((service, i) => (
              <div
                key={i}
                className="group p-8 border border-border hover:border-foreground transition-all duration-500"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight mb-3 group-hover:text-ruby transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-foreground/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for photos */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Next button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Current photo */}
            <motion.img
              key={currentPhotoIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={galleryPhotos[currentPhotoIndex]}
              alt={`Photo ${currentPhotoIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />

            {/* Photo counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 font-mono text-sm">
              {currentPhotoIndex + 1} / {galleryPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default About;
