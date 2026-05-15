import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Camera } from "lucide-react";
import Layout from "@/components/Layout";
import { useCMS } from "@/contexts/CMSContext";

const Work = () => {
  const { portfolioItems } = useCMS();
  
  // Get all portfolio items (include unpublished too for admin)
  const allItems = portfolioItems;
  
  // Get categories from portfolio items
  const categories = [...new Set(allItems.map(item => item.category))];

  // Helper to get items by category
  const getItemsByCategory = (category: string) => 
    allItems.filter(item => item.category === category);

  return (
    <Layout>
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Portfolio</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">Our Work</h1>
          <p className="text-muted-foreground max-w-xl">
            A curated selection of projects spanning film, documentary, commercial, and music video production.
          </p>
        </motion.div>

        {/* Coffee Project */}
        {getItemsByCategory('documentaries').some(item => item.title.toLowerCase().includes('coffee')) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-16 border-b border-border pb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-muted-foreground">01</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">COFFEE</h2>
            </div>
            {(() => {
              const coffeeItem = getItemsByCategory('documentaries').find(item => item.title.toLowerCase().includes('coffee'));
              return coffeeItem ? (
                <Link to={`/work/${coffeeItem.category}/${coffeeItem._id}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={coffeeItem.coverImage || "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910850/DSC06114_s1emfc.jpg"}
                      alt="Coffee project cover"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-20 h-20 text-white" />
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">{coffeeItem.description}</p>
                </Link>
              ) : null;
            })()}
          </motion.div>
        )}

        {/* Categories */}
        <div className="mt-12 space-y-0">
          {categories.map((category, i) => {
            const items = getItemsByCategory(category as any);
            if (items.length === 0) return null;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                className="border-b border-border"
              >
                <Link
                  to={`/work/${category}`}
                  className="group flex items-center justify-between py-10 hover:py-12 transition-all duration-500"
                >
                  <div className="flex items-center gap-8 md:gap-12">
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="font-mono text-xs text-muted-foreground w-8">{String(i + 2).padStart(2, "0")}</span>
                      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight group-hover:text-ruby transition-colors duration-500">
                        {category === 'music-videos' ? 'MUSIC VIDEOS' : category === 'tv-shows' ? 'TV SHOWS' : category.toUpperCase()}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className="font-mono text-xs text-muted-foreground">{items.length} items</span>
                    <Play className="w-5 h-5 text-muted-foreground group-hover:text-ruby transition-colors duration-500" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Work;
