import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { useCMS } from "@/contexts/CMSContext";
import { portfolioCategoryLabels } from "@/types/cms";

const colorBg: Record<string, string> = {
  ruby: "bg-ruby/10",
  electric: "bg-electric/10",
  amber: "bg-amber/10",
  emerald: "bg-emerald/10",
  violet: "bg-violet/10",
};

const colorText: Record<string, string> = {
  ruby: "text-ruby",
  electric: "text-electric",
  amber: "text-amber",
  emerald: "text-emerald",
  violet: "text-violet",
};

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

const ProjectDetail = () => {
  const { categoryId, id } = useParams();
  const { getPortfolioItem, portfolioItems } = useCMS();
  
  // Try to get from CMS first
  const cmsItem = getPortfolioItem(id || '');
  
  // If CMS item exists, use it; otherwise show not found
  const project = cmsItem ? {
    id: cmsItem._id,
    title: cmsItem.title,
    category: portfolioCategoryLabels[cmsItem.category] || cmsItem.category,
    description: cmsItem.description,
    image: cmsItem.coverImage || cmsItem.images?.[0] || '',
    videoUrl: cmsItem.videoUrl,
    client: '',
    year: new Date(cmsItem.createdAt).getFullYear().toString(),
    color: 'ruby'
  } : null;

  if (!project) {
    return (
      <Layout>
        <div className="pt-32 pb-24 px-6 md:px-12 text-center">
          <h1 className="font-display text-4xl font-bold">Project not found</h1>
          <Link to="/work" className="text-muted-foreground mt-4 inline-block hover:text-foreground transition-colors">
            ← Back to Work
          </Link>
        </div>
      </Layout>
    );
  }

  const currentIndex = portfolioItems.findIndex((p) => p._id === id);
  const nextProject = portfolioItems.length > 0 
    ? portfolioItems[(currentIndex + 1) % portfolioItems.length]
    : null;
  const embedUrl = project.videoUrl ? getYouTubeEmbedUrl(project.videoUrl) : null;

  return (
    <Layout>
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/work" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block">
            ← Back to Work
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{project.category}</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">{project.title}</h1>
            </div>
            <span className="font-mono text-sm text-muted-foreground">{project.year}</span>
          </div>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full aspect-video overflow-hidden"
      >
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      </motion.div>

      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-6">About the Project</h2>
            <p className="text-foreground/80 text-lg leading-relaxed">{project.description}</p>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Client</h4>
              <p className="text-foreground">{project.client}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Category</h4>
              <p className="text-foreground">{project.category}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Year</h4>
              <p className="text-foreground">{project.year}</p>
            </div>
            {project.videoUrl && (
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Watch</h4>
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 font-mono text-sm hover:${colorText[project.color] || "text-ruby"} transition-colors duration-500`}
                >
                  <Play className="w-4 h-4" />
                  Watch on YouTube
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Embed */}
      {embedUrl && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-6 md:px-12 pb-24 max-w-7xl mx-auto"
        >
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-8">Watch the Film</h2>
          <div className="aspect-video w-full bg-secondary/20 border border-border overflow-hidden">
            <iframe
              src={embedUrl}
              title={`${project.title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.section>
      )}

      {/* Next project */}
      {nextProject && (
        <section className="border-t border-border px-6 md:px-12 py-24">
          <div className="max-w-7xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Next Project</p>
            <Link to={`/work/${nextProject.category.toLowerCase().replace(' ', '-')}/${nextProject._id}`} className="group block">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter group-hover:text-ruby transition-colors duration-500">
                {nextProject.title}
              </h2>
              <p className="font-mono text-sm text-muted-foreground mt-2">{portfolioCategoryLabels[nextProject.category] || nextProject.category}</p>
            </Link>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProjectDetail;
