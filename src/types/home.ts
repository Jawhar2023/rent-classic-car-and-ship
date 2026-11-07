export interface CtaLink {
  label: string;
  href: string;
  variant?: "primary-dark" | "secondary-dark";
  external?: boolean;
}

export interface HeroSlide {
  id: string;
  eyebrow?: string;
  title: string;
  image?: string;
  imageMobile?: string;
  videoDesktop?: string;
  videoMobile?: string;
  posterDesktop?: string;
  posterMobile?: string;
  ctas: CtaLink[];
}

export interface ModelSlide {
  id: string;
  eyebrow: string;
  title: string;
  image?: string;
  imageMobile?: string;
  videoDesktop?: string;
  videoMobile?: string;
  exploreHref: string;
}

export interface PromoBlock {
  id: string;
  title: string;
  image: string;
  href: string;
  external?: boolean;
}

export interface StoryItem {
  id: string;
  category: string;
  title: string;
  date: string;
  image: string;
  href: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  image: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}
