import type { ReactNode } from "react";

export interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string | null;
  user_id: string;
  created_at: string;
}

export interface Service {
  title: string;
  image: string;
}

export interface Freelancer {
  name: string;
  username: string;
  badge: string;
  location: string;
  title: string;
  rating: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  image: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface HeaderProps {
  onAboutUsClick?: () => void;
}

export interface ButtonIconProps {
  name: string;
  icon?: React.ComponentType<{ size?: number }>;
}

export interface FreelancerCardProps {
  name: string;
  title: string;
  rating: string;
  description: string;
}

export interface TeamMemberCardProps {
  name: string;
  role: string;
  description: string;
}

export interface GigCardProps {
  gig: Gig;
}

export interface ReviewCardProps {
  review: Review;
}

export interface ScreenshotCardProps {
  imageUrl?: string;
  title?: string;
}

export interface RegistrationHandlesProps {
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

export interface TanstackQueryProviderProps {
  children: ReactNode;
}
