import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Layout from "@/components/Layout";

// Existing photos from about.txt and coffee.txt
const existingPhotos = [
  // About photos
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913656/IMG_2100_toyssn.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913644/IMG_4139_cypqb0.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913646/IMG_4238_mu5ur2.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913634/IMG_7737_jixu0f.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913631/IMG_7732_fhk41u.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913621/IMG_3772_ytmg8f.png",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913621/IMG_3509_guvcwz.jpg",
  // Coffee photos
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158040/IMG_2183_r3ooho.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158042/IMG_2158_isw8bp.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158041/IMG_2162_coqbkf.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158034/DJI_360_htxtip.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158027/DJI_0248_s5ckjn.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158028/IMG_2176_wjv6yr.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158028/IMG_2182_otyn4o.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158025/IMG_2164_kly5rc.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158024/IMG_2165_dffygk.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158022/DJI_0227-Pano_m9sdpp.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158024/DJI_0247_cxp0yy.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158020/IMG_2179_t8shwo.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158019/IMG_2170_xvryis.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158016/IMG_2166_s9upso.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158017/IMG_2163_azdaz9.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158014/IMG_2168_mk3frl.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158156/PANO0002_knurcc.jpg",
  "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158130/PANO0001-Pano_qi8rer.jpg",
];

// Shuffle function to randomize array order
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Lazy Image Component with better loading
const LazyImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
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

    const imgElement = document.getElementById(`photo-${index}`);
    if (imgElement) observer.observe(imgElement);

    return () => observer.disconnect();
  }, [index]);

  if (hasError) {
    return (
      <div className="aspect-[4/3] bg-muted flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Image unavailable</p>
      </div>
    );
  }

  return (
    <div id={`photo-${index}`} className="aspect-[4/3] bg-muted overflow-hidden">
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
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
        />
      )}
      {!isLoaded && (
        <div className="w-full h-full bg-muted animate-pulse" />
      )}
    </div>
  );
};

const PhotosPage = () => {
  const { photoId } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allPhotos, setAllPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch photos from MongoDB API
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/photos`);
        const photos = await response.json();
        
        // Extract image URLs from MongoDB data
        const photoUrls = photos.map((photo: { imageUrl: string }) => photo.imageUrl).filter(Boolean);
        
        // Combine with existing hardcoded photos and shuffle
        const combined = [...existingPhotos, ...photoUrls];
        const shuffled = shuffleArray(combined);
        setAllPhotos(shuffled);
      } catch (error) {
        console.error('Error fetching photos:', error);
        // Fallback to existing photos if fetch fails
        setAllPhotos(shuffleArray(existingPhotos));
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // If viewing a single photo in lightbox
  useEffect(() => {
    if (photoId && allPhotos.length > 0) {
      const index = allPhotos.findIndex(p => p.includes(photoId));
      if (index >= 0) {
        setCurrentIndex(index);
        setLightboxOpen(true);
      }
    }
  }, [photoId, allPhotos]);

  if (loading) {
    return (
      <Layout>
        <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-muted rounded mb-2" />
            <div className="h-16 w-64 bg-muted rounded mb-4" />
            <div className="h-6 w-96 bg-muted rounded" />
          </div>
        </section>
      </Layout>
    );
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % allPhotos.length);
  };

  // Keyboard navigation
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
      {/* Photos gallery */}
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Portfolio</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">PHOTOS</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Cinematic photography capturing moments, emotions, and stories from Ethiopia and beyond.
          </p>
        </motion.div>

        {/* Photos Grid with lazy loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {allPhotos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <LazyImage src={photo} alt={`Photo ${index + 1}`} index={index} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
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
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={allPhotos[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />

            {/* Photo counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 font-mono text-sm">
              {currentIndex + 1} / {allPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default PhotosPage;
