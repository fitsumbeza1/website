import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import Layout from "@/components/Layout";
import { useCMS } from "@/contexts/CMSContext";

const categoryConfig: Record<string, { label: string; description: string; order: number }> = {
  'documentaries': {
    label: 'DOCUMENTARY',
    description: 'Real stories, truthfully told. We craft documentary films that go beyond surface narratives — following lives, exploring cultures, and giving voice to the stories that deserve to be seen.',
    order: 1,
  },
  'music-videos': {
    label: 'MUSIC VIDEOS',
    description: 'Where sound meets vision. We collaborate with artists to build immersive visual worlds around their music — cinematic, bold, and built to move people.',
    order: 2,
  },
  'movies': {
    label: 'MOVIES',
    description: 'Narrative filmmaking at its fullest. From short films to features, we bring scripts to life with a distinct cinematic voice rooted in Ethiopian storytelling.',
    order: 3,
  },
  'commercials': {
    label: 'COMMERCIALS',
    description: 'High-impact visuals that sell. We help brands communicate through stunning imagery and storytelling that leaves a lasting impression.',
    order: 4,
  },
  'tv-shows': {
    label: 'TV SHOWS',
    description: 'Compelling content for the screen. Episodic and broadcast-ready work delivered with consistency and cinematic quality.',
    order: 5,
  },
  'photos': {
    label: 'PHOTOS',
    description: 'Still frames that speak. Behind-the-scenes moments, portraits, and location photography from our productions.',
    order: 6,
  },
};

const Work = () => {
  const { portfolioItems } = useCMS();

  const allItems = portfolioItems;

  const getItemsByCategory = (category: string) =>
    allItems.filter(item => item.category === category);

  const sortedCategories = [...new Set(allItems.map(item => item.category))].sort((a, b) => {
    const orderA = categoryConfig[a]?.order ?? 99;
    const orderB = categoryConfig[b]?.order ?? 99;
    return orderA - orderB;
  });

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
            A curated selection of projects spanning documentary, music video, film, commercial, and television production.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="mt-16 space-y-0">
          {sortedCategories.map((category, i) => {
            const items = getItemsByCategory(category);
            if (items.length === 0) return null;
            const config = categoryConfig[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-b border-border"
              >
                <Link
                  to={`/work/${category}`}
                  className="group flex items-start justify-between py-10 hover:py-12 transition-all duration-500"
                >
                  <div className="flex items-start gap-6 md:gap-10">
                    <span className="font-mono text-xs text-muted-foreground mt-2 w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-2">
                      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight group-hover:text-ruby transition-colors duration-500">
                        {config?.label || category.toUpperCase()}
                      </h2>
                      {config?.description && (
                        <p className="text-muted-foreground text-sm max-w-md leading-relaxed hidden md:block">
                          {config.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 md:gap-12 mt-1 shrink-0">
                    <span className="font-mono text-xs text-muted-foreground">{items.length} {items.length === 1 ? 'project' : 'projects'}</span>
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
