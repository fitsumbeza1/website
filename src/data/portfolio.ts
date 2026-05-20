export interface VideoItem {
  id: string;
  title: string;
  videoUrl?: string;
  coverImage?: string;
  description?: string;
  images?: string[];
}

export interface PortfolioCategory {
  id: string;
  name: string;
  description?: string;
  items: VideoItem[];
  isPhoto?: boolean;
}

export const portfolioData: PortfolioCategory[] = [
  {
    id: "movies",
    name: "MOVIES",
    description: "Feature films and short films that tell compelling stories.",
    items: [
      { id: "joka-27", title: "JOKA 27", videoUrl: "", description: "An intense drama that challenges perceptions.", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910160/joka_new_poster_rasso3.jpg" },
      { id: "beheg-amlak", title: "BEHEG AMLAK", videoUrl: "https://youtu.be/NNgEk647Qy4?si=fRZUe3U-IW-Vg4k2", description: "Ethiopian full length film.", coverImage: "https://img.youtube.com/vi/NNgEk647Qy4/maxresdefault.jpg" },
      { id: "balem", title: "BALEM", videoUrl: "https://youtu.be/43yZ27SdVUw?si=eoAP4l1uU9iSVby-", description: "A gripping story exploring the depths of human emotion.", coverImage: "https://img.youtube.com/vi/43yZ27SdVUw/maxresdefault.jpg" },
    ],
  },
  {
    id: "documentaries",
    name: "DOCUMENTARIES",
    description: "Real stories told with cinematic excellence.",
    items: [
      { id: "dobo", title: "DOBO", videoUrl: "https://youtu.be/zexHLtFerjQ?si=esaOkqFdF559kWHo", description: "A documentary revealing hidden truths.", images: ["https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771928350/dobo_1po_jbhe8m.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771928365/dobo_2po_bhunwe.jpg"] },
      { id: "kerchanse-coffee", title: "The Coffee Project", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt", description: "A visual journey through the art of coffee. From bean to cup, capturing the essence of Ethiopia's coffee culture.", coverImage: "https://res.cloudinary.com/dcj3zekyw/image/upload/f_auto,q_auto/IMG_2174_cdxjsh", images: ["https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158040/IMG_2183_r3ooho.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158042/IMG_2158_isw8bp.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158041/IMG_2162_coqbkf.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158034/DJI_360_htxtip.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158027/DJI_0248_s5ckjn.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158028/IMG_2176_wjv6yr.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158028/IMG_2182_otyn4o.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158025/IMG_2164_kly5rc.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158024/IMG_2165_dffygk.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158022/DJI_0227-Pano_m9sdpp.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158024/DJI_0247_cxp0yy.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158020/IMG_2179_t8shwo.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158019/IMG_2170_xvryis.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158016/IMG_2166_s9upso.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158017/IMG_2163_azdaz9.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158014/IMG_2168_mk3frl.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158156/PANO0002_knurcc.jpg", "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158130/PANO0001-Pano_qi8rer.jpg"] },
    ],
  },
  {
    id: "commercials",
    name: "COMMERCIALS",
    description: "Brand storytelling that captures attention.",
    items: [{ id: "go-flick", title: "GO FLICK COMMERCIAL", videoUrl: "", description: "A dynamic commercial for a leading brand." }],
  },
  {
    id: "music-videos",
    name: "MUSIC-VIDEOS",
    description: "Visual experiences that amplify the music.",
    items: [
      { id: "toxic-love", title: "TOXIC LOVE", videoUrl: "https://www.youtube.com/watch?v=LI1UDweTrUg", description: "A story of love and danger." },
      { id: "sheger", title: "SHEGER", videoUrl: "https://www.youtube.com/watch?v=MHRhc0g32Ko", description: "City lights and urban rhythms." },
      { id: "charm", title: "CHARM", videoUrl: "", description: "Seductive visuals meets catchy beats." },
      { id: "ney-mela", title: "NEY MELA", videoUrl: "https://www.youtube.com/watch?v=00cQUP4PxPs", description: "A celebration of culture and music." },
      { id: "kiki", title: "KIKI", videoUrl: "https://www.youtube.com/watch?v=J_vIXJWLBC4", description: "High energy visuals." },
      { id: "qaroo", title: "QAROO", videoUrl: "https://youtu.be/jEg4ZotZoEs", description: "A journey through sound." },
      { id: "walashe", title: "WALASHE", videoUrl: "https://www.youtube.com/watch?v=_KFgk7av2JI", description: "Waves of rhythm and melody." },
      { id: "harrar", title: "HARRAR", videoUrl: "https://www.youtube.com/watch?v=jEg4ZotZoEs", description: "Ancient stories meet modern beats." },
      { id: "kiyaye", title: "KIYAYE", videoUrl: "", description: "A visual masterpiece." },
      { id: "boona", title: "BOONA", videoUrl: "https://www.youtube.com/watch?v=Kku9RFIiqfc", description: "Rhythm and passion combined." },
      { id: "yastawqal", title: "YASTAWQAL", videoUrl: "https://www.youtube.com/watch?v=1KLlKLFcRQ8", description: "Ambition meets artistry." },
      { id: "call-me", title: "CALL ME", videoUrl: "https://www.youtube.com/watch?v=cEYTjwhcNNc", description: "A compelling call to action." },
      { id: "lollipop", title: "LOLLIPOP", videoUrl: "https://www.youtube.com/watch?v=wVVDoQYcGjs", description: "Sweet melodies and colorful visuals." },
      { id: "kana", title: "KANA", videoUrl: "https://www.youtube.com/watch?v=seL68zV1wWk", description: "A journey of discovery." },
      { id: "shonkooiree", title: "SHONKOOREE", videoUrl: "https://www.youtube.com/watch?v=ozr2Pn7MB0s", description: "Celebration of community spirit." },
      { id: "hasab", title: "HASAB", videoUrl: "https://www.youtube.com/watch?v=rTNkuSFQHBQ", description: "Calculated visuals with impact." },
      { id: "michuu", title: "MICHUU", videoUrl: "https://www.youtube.com/watch?v=AMNMOiH6t4w", description: "A story of resilience." },
    ],
  },
  {
    id: "tv-shows",
    name: "TV-SHOWS",
    description: "Television content that engages audiences.",
    items: [{ id: "gude-fela", title: "GUDE FELA", videoUrl: "", description: "A TV show that brings culture to life.", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910163/EBF56D8A-BD55-4195-8BF3-BC9F3327F57B_kakpt9.jpg" }],
  },
  {
    id: "photos",
    name: "PHOTOS",
    description: "Cinematic photography and visual storytelling.",
    isPhoto: true,
    items: [
      { id: "photo-1", title: "Portrait Session", description: "Studio portrait photography.", coverImage: "" },
      { id: "photo-2", title: "Behind the Scenes", description: "Candid moments from our productions.", coverImage: "" },
      { id: "photo-3", title: "Location Shots", description: "Stunning locations from our shoots.", coverImage: "" },
      { id: "photo-4", title: "Event Coverage", description: "Live event and documentary photography.", coverImage: "" },
      { id: "photo-5", title: "Commercial Photography", description: "Product and brand photography.", coverImage: "" },
      { id: "photo-6", title: "Artistic Shots", description: "Creative and artistic photography.", coverImage: "" },
    ],
  },
];

// Photos data placeholder - will be updated with actual links
export const aboutPhotos: { id: string; src: string; alt: string; caption?: string }[] = [
  { id: "about-1", src: "", alt: "Ruby Pictures team", caption: "Our team at work" },
  { id: "about-2", src: "", alt: "On set", caption: "Behind the scenes" },
  { id: "about-3", src: "", alt: "Studio", caption: "Our creative space" },
  { id: "about-4", src: "", alt: "Production", caption: "Filming on location" },
];

// Helper function to extract YouTube video ID from various URL formats
export function getYouTubeVideoId(url: string): string {
  if (!url) return "";
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : "";
}

// Helper function to get embed URL
export function getYouTubeEmbedUrl(url: string): string {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

// Helper to get thumbnail URL
export function getYouTubeThumbnailUrl(url: string): string {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
}
