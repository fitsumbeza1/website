import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import Layout from "@/components/Layout";

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

const CoffeeProject = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dcj3zekyw/image/upload/q_auto/f_auto/v1779229933/DSC05581_auuds9.jpg"
            alt="The Coffee Project"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-12 pb-16 w-full max-w-7xl mx-auto">
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-300 mb-2">Documentary</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
              The Coffee Project
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Description + Watch button */}
      <section className="py-16 border-b border-border">
        <div className="px-6 md:px-12 max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-8">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80 flex-1">
            A visual journey through the art of coffee. From bean to cup, capturing the essence of Ethiopia's coffee culture through stunning photography. Ethiopia, the birthplace of coffee, offers a rich tapestry of traditions, landscapes, and people that come together in every cup.
          </p>
          <a
            href="https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-500 shrink-0"
          >
            <Play className="w-4 h-4" />
            Watch Film
          </a>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-24">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coffeeImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`group overflow-hidden ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
              >
                <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[3/4]"}`}>
                  <img
                    src={image}
                    alt={`The Coffee Project — photo ${i + 1}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
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
          <Link
            to="/work/documentaries"
            className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            More Documentaries →
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default CoffeeProject;
