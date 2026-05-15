import { motion } from "framer-motion";
import { getYouTubeEmbedUrl } from "@/data/portfolio";
import { useState } from "react";

interface VideoCardProps {
  title: string;
  videoUrl?: string;
  index: number;
}

const VideoCard = ({ title, videoUrl, index }: VideoCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-muted overflow-hidden mb-4">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto text-muted-foreground mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p className="text-muted-foreground text-sm">Cover Image Coming Soon</p>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
    </motion.div>
  );
};

export default VideoCard;
