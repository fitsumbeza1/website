import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { portfolioData, getYouTubeEmbedUrl } from "@/data/portfolio";
import { useCMS } from "@/contexts/CMSContext";
import { PortfolioCategory, portfolioCategoryLabels } from "@/types/cms";

const VideoDetail = () => {
  const { categoryId, videoId } = useParams();
  const { portfolioItems, isLoading } = useCMS();
  
  // Get item directly by ID from all portfolio items (including unpublished)
  const directItem = portfolioItems.find(item => item._id === videoId);
  
  // Get static category info for fallback
  const staticCategory = portfolioData.find((c) => c.id === categoryId);
  const staticVideo = staticCategory?.items.find((v) => v.id === videoId);

  // Priority: 1) directItem (from CMS), 2) staticVideo (from static data)
  const item = directItem || staticVideo;
  
  // Get the category name
  const itemCategory = item 
    ? (item as any).category 
      ? portfolioCategoryLabels[(item as any).category as PortfolioCategory] || (item as any).category
      : staticCategory?.name || ''
    : staticCategory?.name || '';

  // Get display options
  const displayOptions = {
    objectFit: (item as any).objectFit || 'cover',
    orientation: (item as any).orientation || 'landscape',
  };
  
  const getImageStyle = () => {
    let aspectRatioClass = 'aspect-video';
    if (displayOptions.orientation === 'portrait') aspectRatioClass = 'aspect-[9/16]';
    else if (displayOptions.orientation === 'square') aspectRatioClass = 'aspect-square';
    
    let objectFitClass = 'object-cover';
    if (displayOptions.objectFit === 'contain') objectFitClass = 'object-contain';
    else if (displayOptions.objectFit === 'fill') objectFitClass = 'object-fill';
    else if (displayOptions.objectFit === 'none') objectFitClass = 'object-none';
    
    return { aspectRatioClass, objectFitClass };
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-4"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-8"></div>
            <div className="aspect-video bg-muted rounded mb-8"></div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <h1 className="font-display text-4xl font-bold">Video not found</h1>
          <p className="text-muted-foreground mt-2">ID: {videoId}</p>
          <Link to="/work" className="text-muted-foreground hover:text-foreground mt-4 inline-block">
            ← Back to Work
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to={`/work/${categoryId || ''}`} className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← {itemCategory || 'Back'}
          </Link>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">{item.title}</h1>
        </motion.div>

        {/* Video Player or Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative ${getImageStyle().aspectRatioClass} bg-muted overflow-hidden mb-8`}
        >
          {(item as any).videoUrl ? (
            <iframe
              src={getYouTubeEmbedUrl((item as any).videoUrl)}
              title={item.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (item as any).coverImage ? (
            <img src={(item as any).coverImage} alt={item.title} className={`w-full h-full ${getImageStyle().objectFitClass}`} />
          ) : (item as any).images && (item as any).images.length > 0 ? (
            <img src={(item as any).images[0]} alt={item.title} className={`w-full h-full ${getImageStyle().objectFitClass}`} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <p className="text-muted-foreground">Coming Soon</p>
            </div>
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-foreground/80 text-lg leading-relaxed">
            {(item as any).description || "No description available."}
          </p>
        </motion.div>

        {/* Images Gallery */}
        {(item as any).images && (item as any).images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="font-display text-2xl font-semibold mb-6">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(item as any).images.map((image: string, index: number) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={image}
                    alt={`${item.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </Layout>
  );
};

export default VideoDetail;
