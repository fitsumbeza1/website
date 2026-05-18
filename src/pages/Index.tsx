import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Camera, ChevronLeft, ChevronRight, Quote, ArrowDown } from "lucide-react";
import Layout from "@/components/Layout";
import { portfolioData, getYouTubeThumbnailUrl } from "@/data/portfolio";
import { useTheme } from "@/contexts/ThemeContext";
import { useCMS } from "@/contexts/CMSContext";

const logoUrl = "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913043/ruby_black-01_auqws2.png";

// Default fallback photos
const defaultRubyPhotos = [
  "https://res.cloudinary.com/dcj3zekyw/image/upload/q_auto/f_auto/v1779129094/IMG_4817_mgw5fo.png",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1772249801/IMG_4236_lpvxsk.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1772249801/IMG_4237_wvodrh.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1772249801/IMG_4240_j1lx30.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1772249801/IMG_4241_mroax1.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1772249800/IMG_4239_ovccdo.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1772249800/IMG_4237-copy-0_gzilwu.jpg",
];

// Coffee images for fallback
const coffeeImages = [
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910850/DSC06114_s1emfc.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910845/DSC06232_rsv8sv.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910845/DSC07928_s3gpku.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910844/DSC07484_vk151z.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910842/DSC07681_ko5wvv.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910837/DSC07449_m4w8go.jpg",
];

// Hero videos carousel content - DEFAULT fallback
const heroSlidesDefault = [
 
  {
    id: "hero-2",
    videoUrl: "https://res.cloudinary.com/dhb7y3wk3/video/upload/v1770919216/0212_ax1hc5.mp4",
    fallbackImage: coffeeImages[1],
    title: "The Coffee Project",
    subtitle: "",
    description: "Ethiopia's Finest Coffee Journey",
  },
];

// Testimonials data - DEFAULT fallback
const testimonialsDefault = [
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
  {
    id: 4,
    name: "Adam Neutzsky-Wulff",
    quote: "I am very happy to extend my warmest recommendation of Fitsum Beza Basora. He is a truly gifted director of photography. I had the joy of working with him on two corporate films for the McKinsey corporation and the result was amazing. The films turned out great! Fitsum always prepairs way more than the budget allows for, so I can attest to Fitsum being in this business for all the right reasons. Besides the main one being his extraordinary talent and great eye.",
    role: "Group CEO, Drama Deluxe",
  },
];

// Drama Deluxe testimony image
const dramaDeluxeTestimony = "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913625/photo_2026-02-12_19-04-15_vzzqno.jpg";

// Get featured videos (first video from each category with a URL)
const featuredVideos = portfolioData
  .flatMap((cat) =>
    cat.items
      .filter((item) => item.videoUrl && !cat.isPhoto)
      .map((item) => ({ ...item, category: cat.name, categoryId: cat.id }))
  )
  .slice(0, 6);

// Featured projects - you can change which one to display
const featuredProjects = [
  {
    id: "kerchanse-coffee",
    title: "The Coffee Project",
    description: "A visual journey through the art of coffee. From bean to cup, capturing the essence of Ethiopia's coffee culture through stunning photography.",
    category: "Photo Project",
    categoryId: "coffee",
    coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910850/DSC06114_s1emfc.jpg",
  },
  {
    id: "dobo",
    title: "DOBO",
    description: "A documentary revealing hidden truths. An immersive visual experience exploring the depths of Ethiopian stories.",
    category: "Documentary",
    categoryId: "documentaries",
    coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771928350/dobo_1po_jbhe8m.jpg",
  },
];

// Current featured project (change index to show different project: 0 = The Coffee Project, 1 = DOBO)
const currentFeaturedIndex = 1; // Set to 0 for The Coffee Project, 1 for DOBO
const currentFeatured = featuredProjects[currentFeaturedIndex];

// Legacy support
const coffeeProject = featuredProjects[0];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentRubyPhoto, setCurrentRubyPhoto] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const { theme } = useTheme();
  const { rubySlides, getRubySlides, heroSlides, getHeroSlides, testimonials: cmsTestimonials, featuredSections, getFeaturedSections, clients, getClients } = useCMS();

  // Get ruby slides from CMS or use default
  const rubyPicturesPhotos = rubySlides.length > 0 
    ? getRubySlides().map(s => s.imageUrl) 
    : defaultRubyPhotos;

  // Get hero slides from CMS or use default
  const heroSlidesData = heroSlides.length > 0 
    ? getHeroSlides().map(s => ({
        id: s._id,
        videoUrl: s.videoUrl || '',
        fallbackImage: s.fallbackImage,
        title: s.title,
        subtitle: s.subtitle || '',
        description: s.description || '',
      }))
    : heroSlidesDefault;

  // Get testimonials from CMS or use default
  const testimonialsData = cmsTestimonials.length > 0 
    ? cmsTestimonials.map((t, i) => ({
        id: i + 1,
        name: t.name,
        quote: t.quote,
      }))
    : testimonialsDefault;

  // Get featured sections from CMS
  const featuredSectionsData = getFeaturedSections();
  const currentFeatured = featuredSectionsData.length > 0 
    ? {
        id: featuredSectionsData[0]._id,
        title: featuredSectionsData[0].title,
        description: featuredSectionsData[0].description,
        categoryId: featuredSectionsData[0].categoryId,
        coverImage: featuredSectionsData[0].coverImage,
        link: featuredSectionsData[0].link,
        layout: featuredSectionsData[0].layout,
        imageOrientation: featuredSectionsData[0].imageOrientation,
      }
    : { ...featuredProjects[0], link: "" };

  // Auto-advance Ruby Pictures slideshow every 5 seconds
  useEffect(() => {
    if (rubyPicturesPhotos.length <= 1) return;
    
    // Preload next image
    const nextPhotoIndex = (currentRubyPhoto + 1) % rubyPicturesPhotos.length;
    const nextImageUrl = rubyPicturesPhotos[nextPhotoIndex];
    
    if (nextImageUrl && !preloadedImages.has(nextImageUrl)) {
      const img = new Image();
      img.src = nextImageUrl;
      img.onload = () => {
        setPreloadedImages(prev => new Set([...prev, nextImageUrl]));
      };
    }
    
    const timer = setInterval(() => {
      setCurrentRubyPhoto((prev) => (prev + 1) % rubyPicturesPhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [rubyPicturesPhotos.length, currentRubyPhoto, rubyPicturesPhotos, preloadedImages]);

  // Navigate to next Ruby Pictures photo
  const nextRubyPhoto = useCallback(() => {
    setCurrentRubyPhoto((prev) => (prev + 1) % rubyPicturesPhotos.length);
  }, []);

  // Navigate to previous Ruby Pictures photo
  const prevRubyPhoto = useCallback(() => {
    setCurrentRubyPhoto((prev) => (prev - 1 + rubyPicturesPhotos.length) % rubyPicturesPhotos.length);
  }, []);

  // Navigate to next hero slide
  const nextHeroSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlidesData.length);
  }, [isTransitioning]);

  // Navigate to previous hero slide
  const prevHeroSlide = useCallback(() => {
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
  const handleVideoError = useCallback((index: number, setRandomImage: (img: string) => void) => {
    setLoadedVideos((prev) => new Set([...prev, index]));
    setRandomImage(coffeeImages[Math.floor(Math.random() * coffeeImages.length)]);
    setIsTransitioning(false);
  }, []);

  // Preload next hero slide image
  useEffect(() => {
    if (heroSlidesData.length <= 1) return;
    
    const nextSlideIndex = (currentSlide + 1) % heroSlidesData.length;
    const nextImageUrl = heroSlidesData[nextSlideIndex]?.fallbackImage;
    
    if (nextImageUrl && !preloadedImages.has(nextImageUrl)) {
      const img = new Image();
      img.src = nextImageUrl;
      img.onload = () => {
        setPreloadedImages(prev => new Set([...prev, nextImageUrl]));
      };
    }
  }, [currentSlide, heroSlidesData, preloadedImages]);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    if (heroSlidesData.length <= 1) return;
    const timer = setInterval(() => {
      nextHeroSlide();
    }, 8000);

    return () => clearInterval(timer);
  }, [nextHeroSlide, heroSlidesData.length]);

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

  return (
    <Layout>
      {/* Ruby Pictures Fullscreen Photo Slideshow */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRubyPhoto}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={rubyPicturesPhotos[currentRubyPhoto]}
              alt={`Ruby Pictures ${currentRubyPhoto + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ruby Pictures Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            key={currentRubyPhoto}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Ruby Pictures Logo - Larger */}
            <div className="mb-6">
              <img 
              src={logoUrl} 
              alt="Ruby Pictures Logo" 
              className={`h-32 md:h-40 invert brightness-0 brightness-200`} 
            />
            </div>
            {/* Shine Your Light tagline - below logo */}
            <p className="font-display text-2xl md:text-3xl font-light tracking-widest text-white/90 mb-4 italic">
              Shine Your Own Light
            </p>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              A film production company in Addis Ababa, Ethiopia
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/work"
                className="font-mono text-sm uppercase tracking-widest border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-500"
              >
                View Work
              </Link>
              <Link
                to="/about"
                className="font-mono text-sm uppercase tracking-widest border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-500"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="font-mono text-sm uppercase tracking-widest border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-500"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevRubyPhoto}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextRubyPhoto}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 right-8 z-20">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </Link>
        </div>
      </section>

      {/* Separator - Visual transition between Ruby Pictures and Hero */}
      <div className="h-24 bg-gradient-to-b from-black to-background" />
 {/* Auto-scrolling Featured Videos Carousel */}
      <section className="py-24 overflow-hidden">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Featured Work</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">Latest Videos</h2>
        </div>
        
        {/* Auto-scrolling carousel */}
        <div className="relative">
          <motion.div
            className="flex gap-8 px-6 md:px-12"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...featuredVideos, ...featuredVideos].map((video, i) => (
              <motion.div
                key={`${video.id}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-[300px] md:w-[400px]"
              >
                <Link
                  to={`/work/${video.categoryId}/${video.id}`}
                  className="group block"
                >
                  <div className="relative aspect-video bg-muted overflow-hidden mb-4">
                    {video.videoUrl ? (
                      <img
                        src={getYouTubeThumbnailUrl(video.videoUrl)}
                        alt={video.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary">
                        <Play className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    {video.category}
                  </p>
                  <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-ruby transition-colors duration-500">
                    {video.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hero Carousel */}
      <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background video/image */}
        <div key={currentSlide} className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            {loadedVideos.has(currentSlide) ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={heroSlidesData[currentSlide]?.videoUrl} type="video/mp4" />
              </video>
            ) : (
              <img
                src={heroSlidesData[currentSlide]?.fallbackImage}
                alt={heroSlidesData[currentSlide]?.title}
                className="w-full h-full object-cover"
              />
            )}
            {/* Lighter overlay so the image shows through */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Hidden video preload */}
          {!loadedVideos.has(currentSlide) && heroSlidesData[currentSlide]?.videoUrl && (
            <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0"
              onLoadedData={() => handleVideoLoad(currentSlide)}
              onError={() => handleVideoError(currentSlide, () => {})}
            >
              <source src={heroSlidesData[currentSlide]?.videoUrl} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Navigation arrows */}
        <button onClick={prevHeroSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-colors" aria-label="Previous slide">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={nextHeroSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-colors" aria-label="Next slide">
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Centered content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-300 mb-6">
              {heroSlidesData[currentSlide].description}
            </p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] text-white uppercase mb-10">
              {heroSlidesData[currentSlide].title}
            </h1>
            <div className="flex items-center justify-center gap-6">
              <Link
                to="/work"
                className="font-mono text-sm uppercase tracking-widest border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-500"
              >
                View Work
              </Link>
              <Link
                to="/contact"
                className="font-mono text-sm uppercase tracking-widest border border-white/50 text-white/80 px-8 py-3 hover:border-white hover:text-white transition-all duration-500"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-8 border-b border-border overflow-hidden bg-background">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              {["Movies", "Documentaries", "Commercials", "TV Shows", "Music Videos", "Photos"].map((item) => (
                <span key={`${i}-${item}`} className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-8">
                  {item}
                  <span className="w-1.5 h-1.5 bg-ruby rounded-full" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>


      {/* Ruby Pictures Section */}
      <section className="border-t border-b border-border">
        {/* Centered header */}
        <div className="py-24 px-6 md:px-12 text-center">
          <img
            src={logoUrl}
            alt="Ruby Pictures"
            className="h-14 mx-auto mb-8 opacity-70 dark:invert"
          />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Welcome to</p>
          <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            Ruby Pictures
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            A premier film production company based in Addis Ababa and Nairobi — creating bold cinematic experiences through stunning visuals, authentic emotion, and powerful storytelling.
          </p>
          <p className="text-foreground/40 text-base max-w-xl mx-auto leading-relaxed italic">
            We don't just make videos — we craft timeless stories that people feel.
          </p>
        </div>

        {/* Service cards — full-width edge-to-edge with dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
          <Link
            to="/photos"
            className="group flex flex-col items-center text-center p-12 border-b md:border-b-0 md:border-r border-border hover:bg-secondary/30 transition-all duration-500"
          >
            <Camera className="w-8 h-8 text-ruby mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-ruby transition-colors duration-300">Photography</h3>
            <p className="text-foreground/55 text-sm leading-relaxed max-w-xs">
              Professional photography for events, portraits, products, and film productions.
            </p>
          </Link>
          <Link
            to="/work"
            className="group flex flex-col items-center text-center p-12 border-b md:border-b-0 md:border-r border-border hover:bg-secondary/30 transition-all duration-500"
          >
            <Play className="w-8 h-8 text-ruby mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-ruby transition-colors duration-300">Film Production</h3>
            <p className="text-foreground/55 text-sm leading-relaxed max-w-xs">
              Cinematic video production for music videos, documentaries, commercials, and more.
            </p>
          </Link>
          <Link
            to="/contact"
            className="group flex flex-col items-center text-center p-12 hover:bg-secondary/30 transition-all duration-500"
          >
            <div className="w-8 h-8 text-ruby mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="font-display text-2xl font-bold">✉</span>
            </div>
            <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-ruby transition-colors duration-300">Get in Touch</h3>
            <p className="text-foreground/55 text-sm leading-relaxed max-w-xs">
              Let's create something remarkable together. Reach out for your next project.
            </p>
          </Link>
        </div>
      </section>

     
      {/* Featured Project - First Article with image above text */}
      <section className="border-t border-border">
        <div className="px-6 md:px-12 max-w-7xl mx-auto py-24">
          {currentFeatured.layout === 'side-by-side' ? (
            // Side by side layout
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-video overflow-hidden">
                  <Link to={`/work/${currentFeatured.categoryId}`} className="group block w-full h-full">
                    <img
                      src={currentFeatured.coverImage}
                      alt={currentFeatured.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Featured Project</p>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">{currentFeatured.title}</h2>
                <p className="text-foreground/80 text-lg leading-relaxed mb-8">
                  {currentFeatured.description}
                </p>
                <Link
                  to={currentFeatured.link || `/work/${currentFeatured.categoryId}`}
                  className="inline-block font-mono text-sm uppercase tracking-widest border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-500"
                >
                  View Project
                </Link>
              </motion.div>
            </div>
          ) : (
            // Image above text layout (default)
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-video overflow-hidden"
              >
                <Link to={`/work/${currentFeatured.categoryId}`} className="group block w-full h-full">
                  <img
                    src={currentFeatured.coverImage}
                    alt={currentFeatured.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Featured Project</p>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">{currentFeatured.title}</h2>
                <p className="text-foreground/80 text-lg leading-relaxed mb-8">
                  {currentFeatured.description}
                </p>
                <Link
                  to={currentFeatured.link || `/work/${currentFeatured.categoryId}`}
                  className="inline-block font-mono text-sm uppercase tracking-widest border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-500"
                >
                  View Project
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-border py-24">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Our Work</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">Categories</h2>
        </div>
        <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-0">
          {portfolioData.filter(cat => !cat.isPhoto).map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={category.id === 'documentaries' ? '/work#documentary' : `/work/${category.id}`}
                className="group flex items-center justify-between py-8 border-b border-border hover:border-foreground transition-colors duration-500"
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="font-mono text-xs text-muted-foreground w-8">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-ruby transition-colors duration-500">
                    {category.name}
                  </h3>
                </div>
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="font-mono text-xs text-muted-foreground">{category.items.length} items</span>
                  <Play className="w-4 h-4 text-muted-foreground group-hover:text-ruby transition-colors duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
          {/* Photos category - removed */}
          {/* End of categories */}
        </div>
      </section>

    

      {/* Movies Showcase */}
      <section className="border-t border-border py-24 bg-background">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Feature Films</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">Movies</h2>
            </div>
            <Link
              to="/work/movies"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 hidden md:block"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.find(c => c.id === 'movies')?.items.filter(item => item.coverImage).map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link to={`/work/movies/${movie.id}`} className="group block relative overflow-hidden">
                  <div className="relative aspect-[2/3] bg-black overflow-hidden">
                    <img
                      src={movie.coverImage}
                      alt={movie.title}
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    {/* Play button */}
                    {movie.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-black/30">
                          <Play className="w-7 h-7 text-white ml-1" />
                        </div>
                      </div>
                    )}
                    {/* Title overlaid on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-2">Ruby Pictures</p>
                      <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
                        {movie.title}
                      </h3>
                      {movie.description && (
                        <p className="text-white/70 text-sm mt-2 leading-relaxed line-clamp-2">{movie.description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Coming Soon placeholder if only one movie has a poster */}
            {(portfolioData.find(c => c.id === 'movies')?.items.filter(item => item.coverImage).length ?? 0) === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative aspect-[2/3] bg-secondary/40 border border-border flex flex-col items-center justify-center gap-4"
              >
                <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center">
                  <Play className="w-6 h-6 text-muted-foreground ml-1" />
                </div>
                <p className="font-display text-2xl font-bold tracking-tight text-muted-foreground">Coming Soon</p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground/50">Next Feature Film</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel - Small at bottom */}
      <section className="py-12 border-t border-border bg-secondary/20">
        <div className="px-6 md:px-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <Quote className="w-5 h-5 text-ruby mx-auto mb-3" />
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
    </Layout>
  );
};

export default Index;
