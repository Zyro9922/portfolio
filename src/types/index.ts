export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: string[];
  tech?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  playStore?: string;
  live?: string;
  image?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
  color: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface TravelLocation {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
  photos: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
