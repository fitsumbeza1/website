import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  PortfolioItem,
  Testimonial,
  Client,
  AboutProfile,
  HeroSlide,
  PortfolioItemFormData,
  TestimonialFormData,
  ClientFormData, 
  AboutProfileFormData,
  HeroSlideFormData,
  PortfolioCategory,
  RubySlide,
  RubySlideFormData,
  FeaturedSection,
  FeaturedSectionFormData,
  AboutPageContent,
  AboutPageContentFormData,
  Message,
  MessageFormData,
} from '@/types/cms';

// Express API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Default mock data (used as fallback if API not available)
const defaultPortfolioItems: PortfolioItem[] = [
  {
    _id: '3',
    title: 'THE COFFEE PROJECT',
    description: 'A visual journey through Ethiopia\'s ancient coffee culture — from highland farm to city cup. Shot across the lush Kerchanse highlands, this documentary follows the hands and stories behind one of the world\'s most beloved traditions.',
    videoUrl: 'https://youtu.be/XOLherLZue8?si=x_Fkl72eVz2t7xQt',
    coverImage: 'https://res.cloudinary.com/dcj3zekyw/image/upload/f_auto,q_auto/IMG_2174_cdxjsh',
    category: 'documentaries',
    priority: 1,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    title: 'DOBO',
    description: 'A documentary that steps into the everyday lives of those living on the margins — raw, unfiltered, and deeply human. DOBO is a portrait of resilience, shot with honesty and care in the streets and communities of Ethiopia.',
    videoUrl: 'https://youtu.be/zexHLtFerjQ?si=esaOkqFdF559kWHo',
    coverImage: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771928350/dobo_1po_jbhe8m.jpg',
    category: 'documentaries',
    priority: 2,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '6',
    title: 'GUMAYE',
    description: 'A vibrant visual journey through rhythm and culture.',
    videoUrl: 'https://youtu.be/NDWqiLS5KVM?si=uiVeu6LaWBtzbbmK',
    coverImage: 'https://img.youtube.com/vi/NDWqiLS5KVM/maxresdefault.jpg',
    category: 'music-videos',
    priority: 1,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '1',
    title: 'TOXIC LOVE',
    description: 'A story of love and danger.',
    videoUrl: 'https://www.youtube.com/watch?v=LI1UDweTrUg',
    coverImage: 'https://img.youtube.com/vi/LI1UDweTrUg/maxresdefault.jpg',
    category: 'music-videos',
    priority: 2,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'SHEGER',
    description: 'City lights and urban rhythms.',
    videoUrl: 'https://www.youtube.com/watch?v=MHRhc0g32Ko',
    coverImage: 'https://img.youtube.com/vi/MHRhc0g32Ko/maxresdefault.jpg',
    category: 'music-videos',
    priority: 3,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '7',
    title: 'BOONAA BONNAA',
    description: 'Rhythm and passion combined.',
    videoUrl: 'https://youtu.be/Kku9RFIiqfc?si=z7ADNJor76wLG_ws',
    coverImage: 'https://img.youtube.com/vi/Kku9RFIiqfc/maxresdefault.jpg',
    category: 'music-videos',
    priority: 4,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '5',
    title: 'NEY MELA',
    description: 'A celebration of culture and music.',
    videoUrl: 'https://youtu.be/00cQUP4PxPs?si=OEXQMhWN5y4bHJhm',
    coverImage: 'https://img.youtube.com/vi/00cQUP4PxPs/maxresdefault.jpg',
    category: 'music-videos',
    priority: 5,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '8',
    title: 'SAAMBEE',
    description: '',
    videoUrl: 'https://youtu.be/x-3hFZM-RmY?si=CdwkVvTW-QR-sBYC',
    coverImage: 'https://img.youtube.com/vi/x-3hFZM-RmY/maxresdefault.jpg',
    category: 'music-videos',
    priority: 6,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    _id: '1',
    name: 'Qare The Mask',
    quote: 'Introducing the visionary behind the lens!',
    role: 'Artist',
    priority: 1,
    createdAt: new Date().toISOString(),
  },
];

const defaultClients: Client[] = [
  {
    _id: '1',
    name: 'Drama Deluxe',
    logo: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913625/photo_2026-02-12_19-04-15_vzzqno.jpg',
    description: 'Production House',
    priority: 1,
    createdAt: new Date().toISOString(),
  },
];

const defaultAboutProfile: AboutProfile = {
  _id: '1',
  name: 'Surafel Yimam',
  title: 'Film Director & Cinematographer',
  bio: 'Ruby Pictures is a premier film production company based in Addis Ababa, Ethiopia.',
  avatar: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913043/ruby_black-01_auqws2.png',
  skills: ['Film Direction', 'Cinematography', 'Video Editing'],
  experience: [],
  education: [],
  socialLinks: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const defaultHeroSlides: HeroSlide[] = [
  {
    _id: '1',
    title: 'Ruby Pictures',
    description: 'Film Production Ethiopia',
    fallbackImage: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910845/DSC06232_rsv8sv.jpg',
    priority: 1,
    published: true,
    createdAt: new Date().toISOString(),
  },
];

const defaultRubySlides: RubySlide[] = [
  {
    _id: '1',
    imageUrl: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1772249801/IMG_4236_lpvxsk.jpg',
    priority: 1,
    createdAt: new Date().toISOString(),
  },
];

const defaultFeaturedSections: FeaturedSection[] = [];

const defaultAboutPageContent: AboutPageContent = {
  _id: '1',
  aboutTitle: 'About Us',
  aboutContent: 'Ruby Pictures is a dynamic film production company dedicated to crafting compelling visual stories that resonate with audiences worldwide. Based in the heart of Africa, we bring a unique perspective to every project we undertake.\n\nOur team of passionate filmmakers, cinematographers, and creative professionals work collaboratively to transform ideas into captivating visual experiences. From concept development to final delivery, we maintain the highest standards of quality and creativity.',
  aboutImage: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913644/IMG_4139_cypqb0.jpg',
  ceoName: 'Fitsum Beza',
  ceoTitle: 'Founder & CEO',
  ceoContent: 'I am a passionate and creative Ethiopian young cinematographer dedicated to capturing captivating stories through the lens of my camera.\n\nGrowing up in Ethiopia, a country rich in culture, history, and natural beauty, I have always been drawn to visually capturing the essence of my surroundings. From the vibrant colors of traditional Ethiopian festivals to the breathtaking landscapes that stretch across the country, I strive to create compelling and immersive experiences that leave a lasting impact on the viewer.\n\nI believe in the power of film to bridge gaps, break barriers, and inspire change. Through my work, I aim to shed light on important social and cultural issues, amplifying voices that deserve to be heard.',
  ceoImage: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913656/IMG_2100_toyssn.jpg',
  aboutPhotos: [
    'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913656/IMG_2100_toyssn.jpg',
    'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913644/IMG_4139_cypqb0.jpg',
    'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913646/IMG_4238_mu5ur2.jpg',
    'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913634/IMG_7737_jixu0f.jpg',
    'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913631/IMG_7732_fhk41u.jpg',
    'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913621/IMG_3772_ytmg8f.png',
    'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913621/IMG_3509_guvcwz.jpg',
  ],
  mission: '"To Shine Your Own Light Through Film" — creating cinematic experiences that illuminate stories, celebrate culture, and connect audiences across the globe.',
  stats: [
    { label: 'Projects Completed', value: '50+' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Awards Won', value: '8' },
  ],
  services: [
    { title: 'Feature Films', description: 'Full-length narrative films that tell compelling stories with cinematic excellence.' },
    { title: 'Documentaries', description: 'Informative and inspiring documentaries that explore real stories and subjects.' },
    { title: 'Commercials', description: 'High-impact advertising content that captures attention and drives results.' },
    { title: 'Music Videos', description: 'Creative visual interpretations that bring music to life through stunning imagery.' },
    { title: 'TV Content', description: 'Engaging television programming designed for broadcast and streaming platforms.' },
    { title: 'Photography', description: 'Professional photography services for portfolios, events, and commercial needs.' },
  ],
  contactEmail: 'fitsumbeza1@gmail.com',
  contactPhone: '+251 921 938 039',
  contactAddress: 'Goro, Addis Ababa, Ethiopia',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Default messages (empty)
const defaultMessages: Message[] = [];

interface CMSContextType {
  // Portfolio
  portfolioItems: PortfolioItem[];
  getPortfolioItems: () => PortfolioItem[];
  getPortfolioItemsByCategory: (category: PortfolioCategory) => PortfolioItem[];
  getPortfolioItem: (id: string) => PortfolioItem | undefined;
  createPortfolioItem: (data: PortfolioItemFormData) => Promise<PortfolioItem>;
  updatePortfolioItem: (id: string, data: PortfolioItemFormData) => Promise<PortfolioItem>;
  deletePortfolioItem: (id: string) => Promise<void>;

  // Testimonials
  testimonials: Testimonial[];
  getTestimonials: () => Testimonial[];
  createTestimonial: (data: TestimonialFormData) => Promise<Testimonial>;
  updateTestimonial: (id: string, data: TestimonialFormData) => Promise<Testimonial>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Clients
  clients: Client[];
  getClients: () => Client[];
  createClient: (data: ClientFormData) => Promise<Client>;
  updateClient: (id: string, data: ClientFormData) => Promise<Client>;
  deleteClient: (id: string) => Promise<void>;

  // About Profile
  aboutProfile: AboutProfile | null;
  getAboutProfile: () => AboutProfile | null;
  updateAboutProfile: (data: AboutProfileFormData) => Promise<AboutProfile>;

  // Hero Slides
  heroSlides: HeroSlide[];
  getHeroSlides: () => HeroSlide[];
  createHeroSlide: (data: HeroSlideFormData) => Promise<HeroSlide>;
  updateHeroSlide: (id: string, data: HeroSlideFormData) => Promise<HeroSlide>;
  deleteHeroSlide: (id: string) => Promise<void>;

  // Ruby Slides
  rubySlides: RubySlide[];
  getRubySlides: () => RubySlide[];
  createRubySlide: (data: RubySlideFormData) => Promise<RubySlide>;
  updateRubySlide: (id: string, data: RubySlideFormData) => Promise<RubySlide>;
  deleteRubySlide: (id: string) => Promise<void>;

  // Featured Sections
  featuredSections: FeaturedSection[];
  getFeaturedSections: () => FeaturedSection[];
  createFeaturedSection: (data: FeaturedSectionFormData) => Promise<FeaturedSection>;
  updateFeaturedSection: (id: string, data: FeaturedSectionFormData) => Promise<FeaturedSection>;
  deleteFeaturedSection: (id: string) => Promise<void>;

  // About Page Content
  aboutPageContent: AboutPageContent | null;
  getAboutPageContent: () => AboutPageContent | null;
  updateAboutPageContent: (data: AboutPageContentFormData) => Promise<AboutPageContent>;

  // Messages (Contact Form Submissions)
  messages: Message[];
  getMessages: () => Message[];
  createMessage: (data: MessageFormData) => Promise<Message>;
  markMessageAsRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  // Loading state
  isLoading: boolean;
  // Refresh data
  refreshData: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

interface CMSProviderProps {
  children: React.ReactNode;
}

export const CMSProvider: React.FC<CMSProviderProps> = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(defaultPortfolioItems);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [clients, setClients] = useState<Client[]>(defaultClients);
  const [aboutProfile, setAboutProfile] = useState<AboutProfile | null>(defaultAboutProfile);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [rubySlides, setRubySlides] = useState<RubySlide[]>(defaultRubySlides);
  const [featuredSections, setFeaturedSections] = useState<FeaturedSection[]>(defaultFeaturedSections);
  const [aboutPageContent, setAboutPageContent] = useState<AboutPageContent | null>(defaultAboutPageContent);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch portfolio items
      const portfolioRes = await fetch(`${API_URL}/api/portfolio`);
      if (portfolioRes.ok) {
        const portfolioData = await portfolioRes.json();
        setPortfolioItems(portfolioData);
      }

      // Fetch testimonials
      const testimonialsRes = await fetch(`${API_URL}/api/testimonials`);
      if (testimonialsRes.ok) {
        const testimonialsData = await testimonialsRes.json();
        setTestimonials(testimonialsData);
      }

      // Fetch clients
      const clientsRes = await fetch(`${API_URL}/api/clients`);
      if (clientsRes.ok) {
        const clientsData = await clientsRes.json();
        setClients(clientsData);
      }

      // Fetch about profile
      const aboutRes = await fetch(`${API_URL}/api/about`);
      if (aboutRes.ok) {
        const aboutData = await aboutRes.json();
        if (aboutData) {
          setAboutProfile(aboutData);
        }
      }

      // Fetch hero slides
      const heroRes = await fetch(`${API_URL}/api/hero-slides`);
      if (heroRes.ok) {
        const heroData = await heroRes.json();
        setHeroSlides(heroData);
      }

      // Fetch ruby slides
      const rubyRes = await fetch(`${API_URL}/api/ruby-slides`);
      if (rubyRes.ok) {
        const rubyData = await rubyRes.json();
        setRubySlides(rubyData);
      }

      // Fetch featured sections
      const featuredRes = await fetch(`${API_URL}/api/featured`);
      if (featuredRes.ok) {
        const featuredData = await featuredRes.json();
        setFeaturedSections(featuredData);
      }

      // Fetch about page content
      const aboutPageRes = await fetch(`${API_URL}/api/about-page`);
      if (aboutPageRes.ok) {
        const aboutPageData = await aboutPageRes.json();
        // Only set if there's actual data, otherwise keep default
        if (aboutPageData && Object.keys(aboutPageData).length > 0) {
          setAboutPageContent(aboutPageData);
        }
      }

      // Fetch messages
      const messagesRes = await fetch(`${API_URL}/api/messages`);
      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setMessages(messagesData);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Portfolio operations
  const getPortfolioItems = useCallback(() => {
    return [...portfolioItems].sort((a, b) => a.priority - b.priority);
  }, [portfolioItems]);

  const getPortfolioItemsByCategory = useCallback((category: PortfolioCategory) => {
    return portfolioItems
      .filter(item => item.category === category && item.published)
      .sort((a, b) => a.priority - b.priority);
  }, [portfolioItems]);

  const getPortfolioItem = useCallback((id: string) => {
    return portfolioItems.find((item) => item._id === id);
  }, [portfolioItems]);

  const createPortfolioItem = useCallback(async (data: PortfolioItemFormData): Promise<PortfolioItem> => {
    const response = await fetch(`${API_URL}/api/portfolio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newItem = await response.json();
    setPortfolioItems(prev => [...prev, newItem]);
    return newItem;
  }, []);

  const updatePortfolioItem = useCallback(async (id: string, data: PortfolioItemFormData): Promise<PortfolioItem> => {
    const response = await fetch(`${API_URL}/api/portfolio/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updatedItem = await response.json();
    setPortfolioItems(prev => prev.map(item => item._id === id ? updatedItem : item));
    return updatedItem;
  }, []);

  const deletePortfolioItem = useCallback(async (id: string): Promise<void> => {
    await fetch(`${API_URL}/api/portfolio/${id}`, { method: 'DELETE' });
    setPortfolioItems(prev => prev.filter(item => item._id !== id));
  }, []);

  // Testimonial operations
  const getTestimonials = useCallback(() => {
    return [...testimonials].sort((a, b) => a.priority - b.priority);
  }, [testimonials]);

  const createTestimonial = useCallback(async (data: TestimonialFormData): Promise<Testimonial> => {
    const response = await fetch(`${API_URL}/api/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newItem = await response.json();
    setTestimonials(prev => [...prev, newItem]);
    return newItem;
  }, []);

  const updateTestimonial = useCallback(async (id: string, data: TestimonialFormData): Promise<Testimonial> => {
    const response = await fetch(`${API_URL}/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updatedItem = await response.json();
    setTestimonials(prev => prev.map(t => t._id === id ? updatedItem : t));
    return updatedItem;
  }, []);

  const deleteTestimonial = useCallback(async (id: string): Promise<void> => {
    await fetch(`${API_URL}/api/testimonials/${id}`, { method: 'DELETE' });
    setTestimonials(prev => prev.filter(t => t._id !== id));
  }, []);

  // Client operations
  const getClients = useCallback(() => {
    return [...clients].sort((a, b) => a.priority - b.priority);
  }, [clients]);

  const createClient = useCallback(async (data: ClientFormData): Promise<Client> => {
    const response = await fetch(`${API_URL}/api/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newItem = await response.json();
    setClients(prev => [...prev, newItem]);
    return newItem;
  }, []);

  const updateClient = useCallback(async (id: string, data: ClientFormData): Promise<Client> => {
    const response = await fetch(`${API_URL}/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updatedItem = await response.json();
    setClients(prev => prev.map(c => c._id === id ? updatedItem : c));
    return updatedItem;
  }, []);

  const deleteClient = useCallback(async (id: string): Promise<void> => {
    await fetch(`${API_URL}/api/clients/${id}`, { method: 'DELETE' });
    setClients(prev => prev.filter(c => c._id !== id));
  }, []);

  // About Profile operations
  const getAboutProfile = useCallback(() => {
    return aboutProfile;
  }, [aboutProfile]);

  const updateAboutProfile = useCallback(async (data: AboutProfileFormData): Promise<AboutProfile> => {
    const response = await fetch(`${API_URL}/api/about`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updatedProfile = await response.json();
    setAboutProfile(updatedProfile);
    return updatedProfile;
  }, []);

  // Hero Slide operations
  const getHeroSlides = useCallback(() => {
    return heroSlides
      .filter(slide => slide.published)
      .sort((a, b) => a.priority - b.priority);
  }, [heroSlides]);

  const createHeroSlide = useCallback(async (data: HeroSlideFormData): Promise<HeroSlide> => {
    const response = await fetch(`${API_URL}/api/hero-slides`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newSlide = await response.json();
    setHeroSlides(prev => [...prev, newSlide]);
    return newSlide;
  }, []);

  const updateHeroSlide = useCallback(async (id: string, data: HeroSlideFormData): Promise<HeroSlide> => {
    const response = await fetch(`${API_URL}/api/hero-slides/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updatedSlide = await response.json();
    setHeroSlides(prev => prev.map(s => s._id === id ? updatedSlide : s));
    return updatedSlide;
  }, []);

  const deleteHeroSlide = useCallback(async (id: string): Promise<void> => {
    await fetch(`${API_URL}/api/hero-slides/${id}`, { method: 'DELETE' });
    setHeroSlides(prev => prev.filter(s => s._id !== id));
  }, []);

  // Ruby Slide operations
  const getRubySlides = useCallback(() => {
    return [...rubySlides].sort((a, b) => a.priority - b.priority);
  }, [rubySlides]);

  const createRubySlide = useCallback(async (data: RubySlideFormData): Promise<RubySlide> => {
    const response = await fetch(`${API_URL}/api/ruby-slides`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newSlide = await response.json();
    setRubySlides(prev => [...prev, newSlide]);
    return newSlide;
  }, []);

  const updateRubySlide = useCallback(async (id: string, data: RubySlideFormData): Promise<RubySlide> => {
    const response = await fetch(`${API_URL}/api/ruby-slides/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updatedSlide = await response.json();
    setRubySlides(prev => prev.map(s => s._id === id ? updatedSlide : s));
    return updatedSlide;
  }, []);

  const deleteRubySlide = useCallback(async (id: string): Promise<void> => {
    await fetch(`${API_URL}/api/ruby-slides/${id}`, { method: 'DELETE' });
    setRubySlides(prev => prev.filter(s => s._id !== id));
  }, []);

  // Featured Section operations
  const getFeaturedSections = useCallback(() => {
    return featuredSections
      .filter(s => s.published)
      .sort((a, b) => a.priority - b.priority);
  }, [featuredSections]);

  const createFeaturedSection = useCallback(async (data: FeaturedSectionFormData): Promise<FeaturedSection> => {
    const response = await fetch(`${API_URL}/api/featured`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newItem = await response.json();
    setFeaturedSections(prev => [...prev, newItem]);
    return newItem;
  }, []);

  const updateFeaturedSection = useCallback(async (id: string, data: FeaturedSectionFormData): Promise<FeaturedSection> => {
    const response = await fetch(`${API_URL}/api/featured/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updatedItem = await response.json();
    setFeaturedSections(prev => prev.map(s => s._id === id ? updatedItem : s));
    return updatedItem;
  }, []);

  const deleteFeaturedSection = useCallback(async (id: string): Promise<void> => {
    await fetch(`${API_URL}/api/featured/${id}`, { method: 'DELETE' });
    setFeaturedSections(prev => prev.filter(s => s._id !== id));
  }, []);

  // About Page Content operations
  const getAboutPageContent = useCallback(() => {
    return aboutPageContent;
  }, [aboutPageContent]);

  const updateAboutPageContent = useCallback(async (data: AboutPageContentFormData): Promise<AboutPageContent> => {
    const response = await fetch(`${API_URL}/api/about-page`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updatedContent = await response.json();
    setAboutPageContent(updatedContent);
    return updatedContent;
  }, []);

  // Message operations
  const getMessages = useCallback(() => {
    return [...messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [messages]);

  const createMessage = useCallback(async (data: MessageFormData): Promise<Message> => {
    const response = await fetch(`${API_URL}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newMessage = await response.json();
    setMessages(prev => [newMessage, ...prev]);
    return newMessage;
  }, []);

  const markMessageAsRead = useCallback(async (id: string): Promise<void> => {
    await fetch(`${API_URL}/api/messages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    });
    setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
  }, []);

  const deleteMessage = useCallback(async (id: string): Promise<void> => {
    await fetch(`${API_URL}/api/messages/${id}`, { method: 'DELETE' });
    setMessages(prev => prev.filter(m => m._id !== id));
  }, []);

  const value: CMSContextType = {
    portfolioItems,
    getPortfolioItems,
    getPortfolioItemsByCategory,
    getPortfolioItem,
    createPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    testimonials,
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    clients,
    getClients,
    createClient,
    updateClient,
    deleteClient,
    aboutProfile,
    getAboutProfile,
    updateAboutProfile,
    heroSlides,
    getHeroSlides,
    createHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    rubySlides,
    getRubySlides,
    createRubySlide,
    updateRubySlide,
    deleteRubySlide,
    featuredSections,
    getFeaturedSections,
    createFeaturedSection,
    updateFeaturedSection,
    deleteFeaturedSection,
    aboutPageContent,
    getAboutPageContent,
    updateAboutPageContent,
    messages,
    getMessages,
    createMessage,
    markMessageAsRead,
    deleteMessage,
    isLoading,
    refreshData,
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};

export default CMSProvider;
