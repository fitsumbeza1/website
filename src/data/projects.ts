import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  client: string;
  color: string;
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "echoes-of-silence",
    title: "Echoes of Silence",
    category: "Short Film",
    year: "2024",
    image: project1,
    description: "A haunting exploration of solitude in the modern age. Shot across three continents, this short film captures the quiet moments that define us.",
    client: "Independent",
    color: "ruby",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "neon-horizons",
    title: "Neon Horizons",
    category: "Commercial",
    year: "2024",
    image: project2,
    description: "A cinematic brand film for a leading tech company, showcasing the future of urban living through breathtaking aerial cinematography.",
    client: "TechVision Corp",
    color: "electric",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "wild-frontier",
    title: "Wild Frontier",
    category: "Documentary",
    year: "2023",
    image: project3,
    description: "An epic documentary following nomadic communities through the world's most remote mountain ranges. Winner of multiple festival awards.",
    client: "National Geographic",
    color: "amber",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "violet-dreams",
    title: "Violet Dreams",
    category: "Fashion Film",
    year: "2023",
    image: project4,
    description: "A bold fashion film blending haute couture with experimental visual storytelling. Featured at Paris Fashion Week.",
    client: "Maison Lumière",
    color: "violet",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "crimson-stage",
    title: "Crimson Stage",
    category: "Music Video",
    year: "2023",
    image: project5,
    description: "A visceral music video that transforms live performance into cinematic art. Over 50 million views across platforms.",
    client: "Atlantic Records",
    color: "ruby",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "deep-blue",
    title: "Deep Blue",
    category: "Documentary",
    year: "2022",
    image: project6,
    description: "An underwater documentary revealing the hidden world of bioluminescent creatures in the deep ocean.",
    client: "Discovery Channel",
    color: "emerald",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

export const testimonials = [
  {
    quote: "Ruby Pictures transformed our brand vision into something cinematic and unforgettable. The team's attention to detail is unmatched.",
    author: "Sarah Chen",
    role: "CMO, TechVision Corp",
    project: "Neon Horizons",
  },
  {
    quote: "Working with Ruby Pictures felt like a true creative partnership. They elevated our story beyond what we imagined possible.",
    author: "Marcus Webb",
    role: "Executive Producer, Atlantic Records",
    project: "Crimson Stage",
  },
  {
    quote: "The documentary they produced for us won three festival awards. Their dedication to authentic storytelling is rare and remarkable.",
    author: "Dr. Elena Rossi",
    role: "Director of Programming, Discovery Channel",
    project: "Deep Blue",
  },
  {
    quote: "From pre-production to final delivery, Ruby Pictures operated with the precision of a studio and the passion of an indie crew.",
    author: "Jean-Luc Moreau",
    role: "Creative Director, Maison Lumière",
    project: "Violet Dreams",
  },
  {
    quote: "They don't just shoot — they build worlds. Our campaign saw a 300% increase in engagement thanks to their cinematic approach.",
    author: "Aisha Patel",
    role: "Head of Marketing, Horizon Media",
    project: "Neon Horizons",
  },
];

export const clientLogos = [
  "National Geographic",
  "Atlantic Records",
  "Discovery Channel",
  "Maison Lumière",
  "TechVision Corp",
  "Horizon Media",
  "Sony Pictures",
  "Nike",
];
