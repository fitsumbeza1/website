import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";

const galleryPhotos = [
  {
    src: "https://res.cloudinary.com/dcj3zekyw/image/upload/q_auto/f_auto/v1779377796/IMG_2168_ezlqgq.jpg",
    caption: "The light that falls between moments — where silence speaks louder than words.",
  },
  {
    src: "https://res.cloudinary.com/dcj3zekyw/image/upload/q_auto/f_auto/v1779377785/IMG_4817_nnrtv9.png",
    caption: "Every frame a heartbeat. Every image, a world unto itself.",
  },
  {
    src: "https://res.cloudinary.com/dcj3zekyw/image/upload/q_auto/f_auto/v1779377785/IMG_2174_eapc7w.jpg",
    caption: "Beauty is not posed — it is caught in the breath between moments.",
  },
  {
    src: "https://res.cloudinary.com/dcj3zekyw/image/upload/q_auto/f_auto/v1779377787/25.Golden_Girl_1.90.1_dtndyz.png",
    caption: "Golden light on golden skin — a story told without a single word.",
  },
];

const Gallery = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(${galleryPhotos[3].src})`,
            filter: "brightness(0.35)",
          }}
        />
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-300 mb-2">Photo Series</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
              Gallery
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 border-b border-border">
        <div className="px-6 md:px-12 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
            A curated collection of moments frozen in time. Each photograph is a window into a world
            crafted with intention — where light, shadow, and the human spirit converge into something unforgettable.
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-24">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryPhotos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 py-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-sm md:text-base font-light italic leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom nav */}
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

export default Gallery;
