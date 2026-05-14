export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  tech: string[];
  description: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface AgencyData {
  agencyName: string;
  tagline: string;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  services: Service[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  faq: FAQ[];
  contact: {
    email: string;
    address: string;
    social: {
      twitter: string;
      linkedin: string;
      github: string;
    };
  };
}
