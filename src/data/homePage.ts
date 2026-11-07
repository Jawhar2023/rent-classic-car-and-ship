import type { HeroSlide, ModelSlide, NavLink, NewsItem, PromoBlock, StoryItem } from "@/types/home";
import vwFront from "@/assets/models/vw-front.jpeg";
import vwInterior from "@/assets/models/vw-interior.jpeg";
import vwDrive from "@/assets/models/vw-drive.jpeg";
import vwBeetle from "@/assets/models/vw-beetle.jpeg";
import suzukiInazuma from "@/assets/promos/suzuki-inazuma.jpeg";
import suzukiInazumaRestored from "@/assets/promos/suzuki-inazuma-restored.jpeg";
import yachtDeepBlue from "@/assets/stories/yacht-deep-blue.jpeg";
import yachtSuperyachtOcean from "@/assets/stories/yacht-superyacht-ocean.jpeg";
import yachtLuxuryWaves from "@/assets/stories/yacht-luxury-waves.jpeg";
import vwGreenFront from "@/assets/news/vw-green-front.jpeg";
import vwGreenStone from "@/assets/news/vw-green-stone.jpeg";
import vwGreenVintage from "@/assets/news/vw-green-vintage.jpeg";
import vwGreenRestored from "@/assets/news/vw-green-restored.jpeg";

const CDN = "https://www.astonmartin.com";
const CAR_IMAGES = "/assets/images/cars%20trillium";
export const EXPERIENCES_PATH = "/experiences";

export const heroSlides: HeroSlide[] = [
  {
    id: "peugeot-interior-drive",
    eyebrow: "Peugeot 304",
    title: "Behind the Wheel",
    image: `${CAR_IMAGES}/Green_Peugeot_304_interior_202607012320.jpeg`,
    ctas: [{ label: "Explore", href: EXPERIENCES_PATH, variant: "primary-dark" }],
  },
  {
    id: "peugeot-museum",
    eyebrow: "Heritage",
    title: "Restored to Perfection",
    image: `${CAR_IMAGES}/Green_Peugeot_304_parked_museum_202607012321.jpeg`,
    ctas: [{ label: "Explore", href: EXPERIENCES_PATH, variant: "primary-dark" }],
  },
  {
    id: "peugeot-dashboard",
    eyebrow: "Craftsmanship",
    title: "Every Detail Matters",
    image: `${CAR_IMAGES}/Peugeot_304_dashboard_close-up_202607012320.jpeg`,
    ctas: [{ label: "Explore", href: EXPERIENCES_PATH, variant: "primary-dark" }],
  },
  {
    id: "peugeot-vintage-interior",
    eyebrow: "Classic Design",
    title: "Timeless Interior",
    image: `${CAR_IMAGES}/Vintage_Peugeot_304_interior_202607012321.jpeg`,
    ctas: [{ label: "Explore", href: EXPERIENCES_PATH, variant: "primary-dark" }],
  },
  {
    id: "peugeot-forest",
    eyebrow: "The Journey",
    title: "The Open Road",
    image: `${CAR_IMAGES}/Classic_Peugeot_304_forest_road_202607012321.jpeg`,
    ctas: [{ label: "Explore", href: EXPERIENCES_PATH, variant: "primary-dark" }],
  },
  {
    id: "peugeot-night",
    eyebrow: "Paris by Night",
    title: "Elegance After Dark",
    image: `${CAR_IMAGES}/Classic_Peugeot_304_night_202607012321.jpeg`,
    ctas: [{ label: "Explore", href: EXPERIENCES_PATH, variant: "primary-dark" }],
  },
];

export const modelSlides: ModelSlide[] = [
  {
    id: "vw-beetle-restored",
    eyebrow: "CLASSIC. RESTORED.",
    title: "Volkswagen Beetle",
    image: vwBeetle,
    exploreHref: EXPERIENCES_PATH,
  },
  {
    id: "vw-coccinelle-front",
    eyebrow: "ICON. DRIVEN.",
    title: "Volkswagen Coccinelle",
    image: vwFront,
    exploreHref: EXPERIENCES_PATH,
  },
  {
    id: "vw-coccinelle-interior",
    eyebrow: "CRAFTSMANSHIP",
    title: "Volkswagen Coccinelle",
    image: vwInterior,
    exploreHref: EXPERIENCES_PATH,
  },
  {
    id: "vw-coccinelle-drive",
    eyebrow: "BEHIND THE WHEEL",
    title: "Volkswagen Coccinelle",
    image: vwDrive,
    exploreHref: EXPERIENCES_PATH,
  },
];

export const promoBlocks: PromoBlock[] = [
  {
    id: "suzuki-inazuma",
    title: "Suzuki GSX 1200 Inazuma",
    image: suzukiInazuma,
    href: EXPERIENCES_PATH,
  },
  {
    id: "suzuki-inazuma-restored",
    title: "Suzuki GSX 1200 Inazuma",
    image: suzukiInazumaRestored,
    href: EXPERIENCES_PATH,
  },
];

export const stories: StoryItem[] = [
  {
    id: "yacht-deep-blue",
    category: "Luxury",
    title: "Yacht Cruising on Deep Blue",
    date: "July 2026",
    image: yachtDeepBlue,
    href: EXPERIENCES_PATH,
  },
  {
    id: "yacht-superyacht-ocean",
    category: "Luxury",
    title: "Superyacht Cruising Over Blue Ocean",
    date: "July 2026",
    image: yachtSuperyachtOcean,
    href: EXPERIENCES_PATH,
  },
  {
    id: "yacht-luxury-waves",
    category: "Luxury",
    title: "Luxury Yacht Speeding Through Waves",
    date: "July 2026",
    image: yachtLuxuryWaves,
    href: EXPERIENCES_PATH,
  },
];

export const newsItems: NewsItem[] = [
  {
    id: "vw-green-front",
    date: "July 2026",
    title: "Green Volkswagen Coccinelle — Classic Front View",
    image: vwGreenFront,
    href: EXPERIENCES_PATH,
  },
  {
    id: "vw-green-stone",
    date: "July 2026",
    title: "Green Volkswagen Parked at a Stone Building",
    image: vwGreenStone,
    href: EXPERIENCES_PATH,
  },
  {
    id: "vw-green-vintage",
    date: "July 2026",
    title: "Vintage Green Volkswagen in the Countryside",
    image: vwGreenVintage,
    href: EXPERIENCES_PATH,
  },
  {
    id: "vw-green-restored",
    date: "July 2026",
    title: "Restored Green Volkswagen Beetle on Cobblestone",
    image: vwGreenRestored,
    href: EXPERIENCES_PATH,
  },
];

export const mainNavLinks: NavLink[] = [
  { label: "Rent cars", href: "/experiences" },
  { label: "Lazerocare", href: "/lazerocare" },
  { label: "Smile Care", href: "/smile-care" },
  { label: "Tourism Medical", href: "/tourism-medical" },
];

export const footerNav = {
  navigation: [
    { label: "Our World", href: `${CDN}/en-us/our-world` },
    { label: "Models", href: `${CDN}/en-us/models` },
    { label: "Owners", href: `${CDN}/en-us/owners` },
    { label: "F1 Team", href: "https://www.astonmartinf1.com/en-GB/", external: true },
    { label: "Preowned", href: "https://preowned.astonmartin.com/en_us/", external: true },
    { label: "Rent cars", href: "/experiences" },
    { label: "Lazerocare", href: "/lazerocare" },
    { label: "Smile Care", href: "/smile-care" },
    { label: "Tourism Medical", href: "/tourism-medical" },
  ],
  contact: [
    { label: "Dealers", href: `${CDN}/en-us/dealers` },
    { label: "Enquiry", href: `${CDN}/en-us/enquiry` },
    { label: "Contact us", href: `${CDN}/en-us/contact-us` },
  ],
  corporate: [
    { label: "Corporate", href: `${CDN}/en/corporate`, external: true },
    { label: "About us", href: `${CDN}/en/corporate/about-us` },
    { label: "Media", href: "https://media.astonmartin.com/", external: true },
    { label: "Careers", href: `${CDN}/en/corporate/careers` },
    { label: "Investors", href: `${CDN}/en/corporate/investors` },
  ],
};
