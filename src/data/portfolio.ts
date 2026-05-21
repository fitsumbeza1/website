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
      { id: "pastor-alex", title: "PASTOR ALEX", videoUrl: "", description: "Shot in Kenya Cinema. Produced by Ruby Pictures & Embeast Production.", coverImage: "https://res.cloudinary.com/dcj3zekyw/image/upload/q_auto/f_auto/v1779279325/photo_2026-05-20_15.14.16_eupd7i.jpg" },
      { id: "beheg-amlak", title: "BEHEG AMLAK", videoUrl: "https://youtu.be/NNgEk647Qy4?si=fRZUe3U-IW-Vg4k2", description: "Ethiopian full length film.", coverImage: "https://img.youtube.com/vi/NNgEk647Qy4/maxresdefault.jpg" },
      { id: "balem", title: "BALEM", videoUrl: "https://youtu.be/43yZ27SdVUw?si=eoAP4l1uU9iSVby-", description: "A gripping story exploring the depths of human emotion.", coverImage: "https://img.youtube.com/vi/43yZ27SdVUw/maxresdefault.jpg" },
    ],
  },
  {
    id: "documentaries",
    name: "DOCUMENTARIES",
    description: "Real stories told with cinematic excellence.",
    items: [
      { id: "dobo", title: "DOBO", videoUrl: "https://youtu.be/zexHLtFerjQ?si=esaOkqFdF559kWHo", description: "This documentary was filmed in the southern part of Ethiopia and premiered at the European Film Festival, with a special screening in Cannes, France. The project highlights powerful local stories, culture, and human experiences through cinematic storytelling.", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771928350/dobo_1po_jbhe8m.jpg" },
      { id: "pharo-foundation", title: "PHARO FOUNDATION - SOMALILAND & ETHIOPIA", videoUrl: "https://youtu.be/_XH-CFEuTe4?si=FycK71BaC2G_j18n", description: "A selection of projects in Somaliland and Ethiopia. DOP: Fitsum Beza.", coverImage: "https://img.youtube.com/vi/_XH-CFEuTe4/maxresdefault.jpg" },
      { id: "visit-oromia", title: "VISIT OROMIA-BORENA", videoUrl: "https://youtu.be/agCiBLPmgjo?si=JS-fW62fG0Z8NrN3", description: "A cinematic journey through Oromia-Borena.", coverImage: "https://img.youtube.com/vi/agCiBLPmgjo/maxresdefault.jpg" },
      { id: "kerchanse-coffee", title: "THE COFFEE PROJECT", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt", description: "A visual journey through the art of coffee.", coverImage: "https://res.cloudinary.com/dcj3zekyw/image/upload/q_auto/f_auto/v1779229933/DSC05581_auuds9.jpg" },
      { id: "national-palace", title: "NATIONAL PALACE", videoUrl: "https://youtu.be/uDvootlTA00?si=o5mfznm9UrcY_0Ew", description: "DOP: Fitsum Beza.", coverImage: "https://img.youtube.com/vi/uDvootlTA00/maxresdefault.jpg" },
      { id: "beynouna-village", title: "BEYNOUNA VILLAGE - ETHIOPIA", videoUrl: "https://youtu.be/4z-by0jVjYo?si=qCxVffK7LxoLnmi2", description: "DOP: Fitsum Beza.", coverImage: "https://img.youtube.com/vi/4z-by0jVjYo/maxresdefault.jpg" },
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
      { id: "gumaye", title: "GUMAYE", videoUrl: "https://youtu.be/NDWqiLS5KVM?si=uiVeu6LaWBtzbbmK", description: "", coverImage: "https://img.youtube.com/vi/NDWqiLS5KVM/maxresdefault.jpg" },
      { id: "toxic-love", title: "TOXIC LOVE", videoUrl: "https://www.youtube.com/watch?v=LI1UDweTrUg", description: "", coverImage: "https://img.youtube.com/vi/LI1UDweTrUg/maxresdefault.jpg" },
      { id: "sheger", title: "SHEGER", videoUrl: "https://www.youtube.com/watch?v=MHRhc0g32Ko", description: "", coverImage: "https://img.youtube.com/vi/MHRhc0g32Ko/maxresdefault.jpg" },
      { id: "ney-mela", title: "NEY MELA", videoUrl: "https://youtu.be/00cQUP4PxPs?si=OEXQMhWN5y4bHJhm", description: "", coverImage: "https://img.youtube.com/vi/00cQUP4PxPs/maxresdefault.jpg" },
      { id: "marartuu", title: "MARARTUU", videoUrl: "https://youtu.be/F1cfzTGxcCs?si=l1Elwl8uPVpeVnTR", description: "", coverImage: "https://img.youtube.com/vi/F1cfzTGxcCs/maxresdefault.jpg" },
      { id: "call-me", title: "CALL ME", videoUrl: "https://youtu.be/cEYTjwhcNNc?si=i1FtOPw5mez_eUCq", description: "", coverImage: "https://img.youtube.com/vi/cEYTjwhcNNc/maxresdefault.jpg" },
      { id: "mimi", title: "MIMI", videoUrl: "https://youtu.be/bgDcrroWK5Q?si=BnVO3N57BiGvqhjc", description: "", coverImage: "https://img.youtube.com/vi/bgDcrroWK5Q/maxresdefault.jpg" },
      { id: "rajo", title: "RAJO", videoUrl: "https://youtu.be/7RODh-jg8o8?si=rvFGblir6CYnjwYU", description: "", coverImage: "https://img.youtube.com/vi/7RODh-jg8o8/maxresdefault.jpg" },
      { id: "amartii-koo", title: "AMARTII KOO", videoUrl: "https://youtu.be/ect8QI3hPP8?si=EbwIdrQwd50d2Rol", description: "", coverImage: "https://img.youtube.com/vi/ect8QI3hPP8/maxresdefault.jpg" },
      { id: "darroo", title: "DARROO", videoUrl: "https://youtu.be/t5yMzJeos9s?si=bhsmCWLYSJAZSvaA", description: "", coverImage: "https://img.youtube.com/vi/t5yMzJeos9s/maxresdefault.jpg" },
      { id: "shonkooree", title: "SHONKOOREE", videoUrl: "https://youtu.be/ozr2Pn7MB0s?si=xAsYl9hd8NvzpeSK", description: "", coverImage: "https://img.youtube.com/vi/ozr2Pn7MB0s/maxresdefault.jpg" },
      { id: "kiki", title: "KIKI", videoUrl: "https://youtu.be/J_vIXJWLBC4?si=DhBeZcqzjOTD_lf3", description: "", coverImage: "https://img.youtube.com/vi/J_vIXJWLBC4/maxresdefault.jpg" },
      { id: "boonaa-bonnaa", title: "BOONAA BONNAA", videoUrl: "https://youtu.be/Kku9RFIiqfc?si=z7ADNJor76wLG_ws", description: "", coverImage: "https://img.youtube.com/vi/Kku9RFIiqfc/maxresdefault.jpg" },
      { id: "gadaa-malee", title: "GADAA MALEE", videoUrl: "https://youtu.be/XsqGg9ia4xU?si=hoTmJQt5vUGiMAPu", description: "", coverImage: "https://img.youtube.com/vi/XsqGg9ia4xU/maxresdefault.jpg" },
      { id: "harar", title: "HARAR", videoUrl: "https://youtu.be/jEg4ZotZoEs?si=55a1O9Bcl0kvwzfo", description: "", coverImage: "https://img.youtube.com/vi/jEg4ZotZoEs/maxresdefault.jpg" },
      { id: "saambee", title: "SAAMBEE", videoUrl: "https://youtu.be/x-3hFZM-RmY?si=CdwkVvTW-QR-sBYC", description: "", coverImage: "https://img.youtube.com/vi/x-3hFZM-RmY/maxresdefault.jpg" },
      { id: "lolly-pop", title: "LOLLY POP", videoUrl: "https://youtu.be/wVVDoQYcGjs?si=3R-K03G76SkVWgd3", description: "", coverImage: "https://img.youtube.com/vi/wVVDoQYcGjs/maxresdefault.jpg" },
      { id: "kana-jedhiin", title: "KANA JEDHIIN", videoUrl: "https://youtu.be/seL68zV1wWk?si=Dom1vJyaQI6KOdoN", description: "", coverImage: "https://img.youtube.com/vi/seL68zV1wWk/maxresdefault.jpg" },
      { id: "instrumental", title: "INSTRUMENTAL", videoUrl: "https://youtu.be/BuViNxURvTg?si=6yI2DQYE27cmJR_E", description: "", coverImage: "https://img.youtube.com/vi/BuViNxURvTg/maxresdefault.jpg" },
      { id: "sirraa-tola", title: "SIRRAA TOLA", videoUrl: "https://youtu.be/iruH02Byrrw?si=q_qxw9h-ITilRmD5", description: "", coverImage: "https://img.youtube.com/vi/iruH02Byrrw/maxresdefault.jpg" },
      { id: "michuu", title: "MICHUU", videoUrl: "https://youtu.be/AMNMOiH6t4w?si=yq4yY2cVkBdREBIA", description: "", coverImage: "https://img.youtube.com/vi/AMNMOiH6t4w/maxresdefault.jpg" },
    ],
  },
  {
    id: "tv-shows",
    name: "TV-SHOWS",
    description: "Television content that engages audiences.",
    items: [{ id: "gude-fela", title: "GUDE FELA", videoUrl: "", description: "A TV show that brings culture to life.", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910163/EBF56D8A-BD55-4195-8BF3-BC9F3327F57B_kakpt9.jpg" }],
  },
  {
    id: "coffee",
    name: "THE COFFEE PROJECT",
    description: "Cinematic photography and visual storytelling from The Coffee Project.",
    isPhoto: true,
    items: [
      { id: "photo-1", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158040/IMG_2183_r3ooho.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-2", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158042/IMG_2158_isw8bp.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-3", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158041/IMG_2162_coqbkf.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-4", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158034/DJI_360_htxtip.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-5", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158027/DJI_0248_s5ckjn.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-6", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158028/IMG_2176_wjv6yr.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-7", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158028/IMG_2182_otyn4o.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-8", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158025/IMG_2164_kly5rc.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-9", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158024/IMG_2165_dffygk.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-10", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158022/DJI_0227-Pano_m9sdpp.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-11", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158020/IMG_2179_t8shwo.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
      { id: "photo-12", title: "The Coffee Project", description: "The Coffee Project", coverImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158019/IMG_2170_xvryis.jpg", videoUrl: "https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt" },
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
