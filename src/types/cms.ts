// CMS Content Types for Ruby Pictures - Film Production Company

// Portfolio Item (for Movies, Music Videos, Commercials, Documentaries, TV Shows)
export interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string; // YouTube/Vimeo URL
  coverImage?: string; // Cover image URL
  images?: string[]; // Additional images (for photo galleries)
  category: PortfolioCategory;
  priority: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PortfolioCategory = 
  | "movies" 
  | "documentaries" 
  | "commercials" 
  | "tv-shows" 
  | "music-videos" 
  | "photos";

// Testimonial from clients
export interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  role?: string; // e.g., "Artist", "CEO", "Director"
  image?: string; // Profile image
  priority: number;
  createdAt: string;
}

// Client/Partner
export interface Client {
  _id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  priority: number;
  createdAt: string;
}

// About/Profile for the film producer
export interface AboutProfile {
  _id: string;
  name: string;
  title: string; // e.g., "Film Director", "Cinematographer"
  bio: string;
  avatar?: string;
  skills: string[]; // e.g., "Directing", "Cinematography", "Editing"
  experience: Experience[];
  education: Education[];
  socialLinks: SocialLink[];
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

// Hero Slide for homepage carousel
export interface HeroSlide {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  videoUrl?: string;
  fallbackImage: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  orientation?: "landscape" | "portrait" | "square";
  priority: number;
  published: boolean;
  createdAt: string;
}

// Form Types for CRUD operations

export interface PortfolioItemFormData {
  title: string;
  description: string;
  videoUrl?: string;
  coverImage?: string;
  images?: string[];
  category: PortfolioCategory;
  priority: number;
  published: boolean;
}

export interface TestimonialFormData {
  name: string;
  quote: string;
  role?: string;
  image?: string;
  priority: number;
}

export interface ClientFormData {
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  priority: number;
}

export interface AboutProfileFormData {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  skills: string[];
  experience: Omit<Experience, "_id">[];
  education: Omit<Education, "_id">[];
  socialLinks: SocialLink[];
}

export interface HeroSlideFormData {
  title: string;
  subtitle?: string;
  description?: string;
  videoUrl?: string;
  fallbackImage: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  orientation?: "landscape" | "portrait" | "square";
  priority: number;
  published: boolean;
}

// Ruby Slide for homepage photo slideshow
export interface RubySlide {
  _id: string;
  imageUrl: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  orientation?: "landscape" | "portrait" | "square";
  priority: number;
  createdAt: string;
}

export interface RubySlideFormData {
  imageUrl: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  orientation?: "landscape" | "portrait" | "square";
  priority: number;
}

// Featured Section for homepage
export interface FeaturedSection {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  categoryId: string;
  link?: string; // Custom link for the button
  imageObjectFit?: "cover" | "contain" | "fill" | "none";
  imageOrientation?: "landscape" | "portrait" | "square";
  layout?: ImageLayout;
  priority: number;
  published: boolean;
  createdAt: string;
}

export interface FeaturedSectionFormData {
  title: string;
  description: string;
  coverImage: string;
  categoryId: string;
  link?: string;
  imageObjectFit?: "cover" | "contain" | "fill" | "none";
  imageOrientation?: "landscape" | "portrait" | "square";
  layout?: ImageLayout;
  priority: number;
  published: boolean;
}

export type ImageLayout = "image-above" | "side-by-side";

// About Page Content
export interface AboutPageContent {
  _id: string;
  // About Section
  aboutTitle: string;
  aboutContent: string;
  aboutImage: string;
  aboutImageObjectFit?: "cover" | "contain" | "fill" | "none";
  aboutImageOrientation?: "landscape" | "portrait" | "square";
  aboutLayout?: ImageLayout;
  // CEO Section
  ceoName: string;
  ceoTitle: string;
  ceoContent: string;
  ceoImage: string;
  ceoImageObjectFit?: "cover" | "contain" | "fill" | "none";
  ceoImageOrientation?: "landscape" | "portrait" | "square";
  ceoLayout?: ImageLayout;
  // About Photos Gallery
  aboutPhotos: string[];
  aboutPhotosObjectFit?: "cover" | "contain" | "fill" | "none";
  aboutPhotosOrientation?: "landscape" | "portrait" | "square";
  // Mission
  mission: string;
  // Stats
  stats: { label: string; value: string }[];
  // Services
  services: { title: string; description: string }[];
  // Contact Form
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutPageContentFormData {
  aboutTitle: string;
  aboutContent: string;
  aboutImage: string;
  aboutImageObjectFit?: "cover" | "contain" | "fill" | "none";
  aboutImageOrientation?: "landscape" | "portrait" | "square";
  aboutLayout?: ImageLayout;
  ceoName: string;
  ceoTitle: string;
  ceoContent: string;
  ceoImage: string;
  ceoImageObjectFit?: "cover" | "contain" | "fill" | "none";
  ceoImageOrientation?: "landscape" | "portrait" | "square";
  ceoLayout?: ImageLayout;
  aboutPhotos: string[];
  aboutPhotosObjectFit?: "cover" | "contain" | "fill" | "none";
  aboutPhotosOrientation?: "landscape" | "portrait" | "square";
  mission: string;
  stats: { label: string; value: string }[];
  services: { title: string; description: string }[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

// Message from contact form
export interface Message {
  _id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface MessageFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// Default empty instances

export const createEmptyPortfolioItem = (): PortfolioItemFormData => ({
  title: "",
  description: "",
  videoUrl: "",
  coverImage: "",
  images: [],
  category: "music-videos",
  priority: 0,
  published: false,
});

export const createEmptyTestimonial = (): TestimonialFormData => ({
  name: "",
  quote: "",
  role: "",
  image: "",
  priority: 0,
});

export const createEmptyClient = (): ClientFormData => ({
  name: "",
  logo: "",
  website: "",
  description: "",
  priority: 0,
});

export const createEmptyAboutProfile = (): AboutProfileFormData => ({
  name: "Surafel Yimam",
  title: "Film Director & Cinematographer",
  bio: "",
  avatar: "",
  skills: [],
  experience: [],
  education: [],
  socialLinks: [],
});

export const createEmptyHeroSlide = (): HeroSlideFormData => ({
  title: "",
  subtitle: "",
  description: "",
  videoUrl: "",
  fallbackImage: "",
  priority: 0,
  published: false,
});

export const createEmptyRubySlide = (): RubySlideFormData => ({
  imageUrl: "",
  objectFit: "cover",
  orientation: "landscape",
  priority: 0,
});

export const createEmptyAboutPageContent = (): AboutPageContentFormData => ({
  aboutTitle: "About Us",
  aboutContent: "",
  aboutImage: "",
  aboutImageObjectFit: "cover",
  aboutImageOrientation: "landscape",
  aboutLayout: "side-by-side",
  ceoName: "Fitsum Beza",
  ceoTitle: "Founder & CEO",
  ceoContent: "",
  ceoImage: "",
  ceoImageObjectFit: "cover",
  ceoImageOrientation: "landscape",
  ceoLayout: "side-by-side",
  aboutPhotos: [],
  aboutPhotosObjectFit: "cover",
  aboutPhotosOrientation: "landscape",
  mission: "",
  stats: [
    { label: "Projects Completed", value: "50+" },
    { label: "Years Experience", value: "5+" },
    { label: "Happy Clients", value: "30+" },
    { label: "Awards Won", value: "8" },
  ],
  services: [
    { title: "Feature Films", description: "" },
    { title: "Documentaries", description: "" },
    { title: "Commercials", description: "" },
    { title: "Music Videos", description: "" },
    { title: "TV Content", description: "" },
    { title: "Photography", description: "" },
  ],
  contactEmail: "",
  contactPhone: "",
  contactAddress: "",
});

// Portfolio category labels
export const portfolioCategoryLabels: Record<PortfolioCategory, string> = {
  movies: "Movies",
  documentaries: "Documentaries",
  commercials: "Commercials",
  "tv-shows": "TV Shows",
  "music-videos": "Music Videos",
  photos: "Photos",
};
