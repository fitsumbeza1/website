import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";

// Coffee images from coffee.txt (18 photos)
const coffeeImages = [
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
];

const heroVideoUrl = "https://res.cloudinary.com/dhb7y3wk3/video/upload/v1770919216/0212_ax1hc5.mp4";

// Lazy Image Component with better loading
const LazyImage = ({ src, alt, className, aspectRatio = "aspect-[3/4]" }: { src: string; alt: string; className?: string; aspectRatio?: string }) => {
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

    const imgElement = document.getElementById(`lazy-${src}`);
    if (imgElement) observer.observe(imgElement);

    return () => observer.disconnect();
  }, [src]);

  if (hasError) {
    return (
      <div className={`${aspectRatio} bg-muted flex items-center justify-center`}>
        <p className="text-muted-foreground text-sm">Image unavailable</p>
      </div>
    );
  }

  return (
    <div id={`lazy-${src}`} className={`${aspectRatio} bg-muted overflow-hidden ${className || ""}`}>
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
          className="w-full h-full object-cover"
        />
      )}
      {!isLoaded && (
        <div className="w-full h-full bg-muted animate-pulse" />
      )}
    </div>
  );
};

const CoffeeProject = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [randomImage] = useState(coffeeImages[0]);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <Layout>
      {/* Hero with Video */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {!videoLoaded && (
            <>
              <img
                src={randomImage}
                alt="Hero background"
                className="w-full h-full object-cover scale-150"
              />
              <div className="absolute inset-0 bg-black/80" />
            </>
          )}
          <video
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full object-cover absolute inset-0 scale-150 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
          {videoLoaded && <div className="absolute inset-0 bg-black/60" />}
        </div>
        <div className="relative z-10 px-6 md:px-12 pb-12 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-gray-300 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </Link>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-300 mb-2">Photo Project</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
              The Coffee Project
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Project description */}
      <section className="py-16 border-b border-border">
        <div className="px-6 md:px-12 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
            A visual journey through the art of coffee. From bean to cup, capturing the essence of Ethiopia's coffee culture through stunning photography.
            Ethiopia, the birthplace of coffee, offers a rich tapestry of traditions, landscapes, and people that come together in every cup.
          </p>
        </div>
      </section>

      {/* Photo grid with lazy loading */}
      <section className="py-24">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coffeeImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`overflow-hidden ${
                  i === 0 ? "md:col-span-2 lg:col-span-2 aspect-[16/9]" : ""
                }`}
              >
                <a
                  href="https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <LazyImage
                    src={image}
                    alt={`Coffee project photo ${i + 1}`}
                    aspectRatio={i === 0 ? "aspect-[16/9]" : "aspect-[3/4]"}
                    className="grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation to other projects */}
      <section className="py-16 border-t border-border">
        <div className="px-6 md:px-12 max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/work"
            className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            ← All Projects
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default CoffeeProject;
