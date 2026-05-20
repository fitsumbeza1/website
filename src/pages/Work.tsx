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
  'coffee': {
    label: 'THE COFFEE PROJECT',
    description: 'Still frames that speak. Behind-the-scenes moments, portraits, and location photography from our productions.',
    order: 6,
  },
};

const Work = () => {
  const { portfolioItems } = useCMS();

  const allItems = portfolioItems;

  const getItemsByCategory = (category: string) =>
    allItems.filter(item => item.category === category);

  const sortedCategories = [...new Set(allItems.map(item => item.category))]
    .sort((a, b) => (categoryConfig[a]?.order ?? 99) - (categoryConfig[b]?.order ?? 99))
    .filter(cat => getItemsByCategory(cat).length > 0);

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
          <div className="mt-6">
            <a
              href="https://www.youtube.com/@Ruby_Pictures"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#cc0000] text-white px-6 py-3 rounded-full transition-colors duration-300 font-mono text-sm uppercase tracking-widest"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch on YouTube
            </a>
          </div>
        </motion.div>

        {/* Documentary Projects — featured directly */}
        {getItemsByCategory('documentaries').length > 0 && (() => {
          const docs = getItemsByCategory('documentaries');
          const [first, ...rest] = docs;
          return (
            <div id="documentary" className="mt-16 border-t border-border pt-16">
              <div className="flex items-start gap-6 md:gap-10 mb-10">
                <span className="font-mono text-xs text-muted-foreground mt-2 w-8 shrink-0">01</span>
                <div className="space-y-2">
                  <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">DOCUMENTARY</h2>
                  <p className="text-muted-foreground text-sm max-w-md leading-relaxed hidden md:block">
                    {categoryConfig['documentaries'].description}
                  </p>
                </div>
              </div>

              {/* 50/50 grid — each card keeps its natural proportions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Coffee Project — portrait 4:5 matching natural image ratio */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <a href={first.videoUrl || '#'} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden mb-4">
                      <img
                        src={first.coverImage}
                        alt={first.title}
                        className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-14 h-14 text-white" />
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-tight group-hover:text-ruby transition-colors duration-300">
                      {first.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed line-clamp-2">
                      {first.description}
                    </p>
                  </a>
                </motion.div>

                {/* DOBO and other portrait posters — 2:3 natural ratio */}
                {rest.map((item, i) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (i + 1) * 0.12 }}
                  >
                    <a href={item.videoUrl || '#'} target="_blank" rel="noopener noreferrer" className="group block">
                      <div className="relative aspect-[2/3] overflow-hidden mb-4">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="w-14 h-14 text-white" />
                        </div>
                      </div>
                      <h3 className="font-display text-xl font-bold tracking-tight group-hover:text-ruby transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Other Categories */}
        <div className="mt-16 space-y-0">
          {sortedCategories.filter(cat => cat !== 'documentaries').map((category, i) => {
            const items = getItemsByCategory(category);
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
                      {String(i + 2).padStart(2, "0")}
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
