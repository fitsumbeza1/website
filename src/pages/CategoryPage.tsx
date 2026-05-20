import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { portfolioData, getYouTubeThumbnailUrl } from "@/data/portfolio";
import { useCMS } from "@/contexts/CMSContext";
import { Play } from "lucide-react";
import { PortfolioCategory, portfolioCategoryLabels } from "@/types/cms";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { portfolioItems } = useCMS();
  
  // Get portfolio items from CMS - include all items (published and unpublished)
  const cmsItems = portfolioItems.filter(item => item.category === categoryId);
  
  // Find the category info from static data
  const staticCategory = portfolioData.find((c) => c.id === categoryId);
  
  // Determine if this is a photo category
  const isPhotoCategory = categoryId === 'photos' || staticCategory?.isPhoto || false;
  
  // Use static category info, or create from categoryId
  const category = staticCategory || {
    id: categoryId || '',
    name: portfolioCategoryLabels[categoryId as PortfolioCategory] || categoryId || '',
    description: '',
    items: [],
    isPhoto: false
  };

  // Combine CMS items with static items if CMS is empty
  const items = cmsItems.length > 0 
    ? cmsItems.map(item => ({
        id: item._id,
        title: item.title,
        coverImage: item.coverImage,
        videoUrl: item.videoUrl,
        images: item.images,
        objectFit: (item as any).objectFit || 'cover',
        orientation: (item as any).orientation || 'landscape',
      }))
    : staticCategory?.items || [];

  // Helper function to get image style based on display options
  const getImageStyle = (item: any) => {
    const objectFit = item.objectFit || 'cover';
    const orientation = item.orientation || 'landscape';
    
    let aspectRatioClass = 'aspect-[9/16]';
    if (orientation === 'landscape') aspectRatioClass = 'aspect-video';
    else if (orientation === 'square') aspectRatioClass = 'aspect-square';
    else if (orientation === 'portrait') aspectRatioClass = 'aspect-[9/16]';
    
    let objectFitClass = 'object-cover';
    if (objectFit === 'contain') objectFitClass = 'object-contain';
    else if (objectFit === 'fill') objectFitClass = 'object-fill';
    else if (objectFit === 'none') objectFitClass = 'object-none';
    
    return { aspectRatioClass, objectFitClass };
  };

  if (!category) {
    return (
      <Layout>
        <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <h1 className="font-display text-4xl font-bold">Category not found</h1>
          <Link to="/work" className="text-muted-foreground hover:text-foreground mt-4 inline-block">
            ← Back to Work
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/work" className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← All Categories
          </Link>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-muted-foreground text-lg max-w-2xl">{category.description}</p>
          )}
        </motion.div>

        {/* YouTube Channel Button */}
        <div className="mt-10">
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

        {/* Video Grid with Cover Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <a
                href={item.videoUrl || '#'}
                target={item.videoUrl ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="group block"
              >
                <div className={`relative aspect-video w-full bg-muted overflow-hidden mb-4`}>
                  {item.videoUrl ? (
                    <img
                      src={getYouTubeThumbnailUrl(item.videoUrl)}
                      alt={item.title}
                      className={`w-full h-full ${getImageStyle(item).objectFitClass} grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105`}
                    />
                  ) : item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className={`w-full h-full ${getImageStyle(item).objectFitClass} grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105`}
                    />
                  ) : item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className={`w-full h-full ${getImageStyle(item).objectFitClass} grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                      <p className="text-muted-foreground text-sm">Coming Soon</p>
                    </div>
                  )}
                  {/* Play overlay only for videos */}
                  {item.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight group-hover:text-ruby transition-colors duration-500">
                  {item.title}
                </h3>
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
