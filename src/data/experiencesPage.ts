import peugeot304Forest from "@/assets/experiences/peugeot-304-forest.jpeg";
import peugeot304Museum from "@/assets/experiences/peugeot-304-museum.jpeg";
import peugeot304Interior from "@/assets/experiences/peugeot-304-interior.jpeg";
import peugeot304Night from "@/assets/experiences/peugeot-304-night.jpeg";
import peugeot304Drone from "@/assets/experiences/peugeot-304-drone.jpeg";
import vwBeetleWhiteRestored from "@/assets/experiences/vw-beetle-white-restored.jpeg";
import vwBeetleWhiteFront from "@/assets/experiences/vw-beetle-white-front.jpeg";
import vwBeetleWhiteParked from "@/assets/experiences/vw-beetle-white-parked.jpeg";
import vwBeetleInterior from "@/assets/experiences/vw-beetle-interior.jpeg";
import vwBeetleCockpit from "@/assets/experiences/vw-beetle-cockpit.jpeg";
import vwGreenRestored from "@/assets/news/vw-green-restored.jpeg";
import vwGreenFront from "@/assets/news/vw-green-front.jpeg";
import vwGreenVintage from "@/assets/news/vw-green-vintage.jpeg";
import vwGreenStone from "@/assets/news/vw-green-stone.jpeg";
import suzukiInazuma from "@/assets/promos/suzuki-inazuma.jpeg";
import suzukiInazumaRestored from "@/assets/promos/suzuki-inazuma-restored.jpeg";
import suzukiInazumaAlt from "@/assets/experiences/suzuki-inazuma-alt.jpeg";
import yachtDeepBlue from "@/assets/stories/yacht-deep-blue.jpeg";
import yachtSuperyachtOcean from "@/assets/stories/yacht-superyacht-ocean.jpeg";
import yachtLuxuryWaves from "@/assets/stories/yacht-luxury-waves.jpeg";

export const RESERVATION_EMAIL = "contact@trilliumagency.com";
export const RESERVATION_SECTION_ID = "reservation";

export const reservationVehicles = [
  { id: "ascend", label: "Peugeot 304" },
  { id: "supertours", label: "White Volkswagen Beetle" },
  { id: "unleashed", label: "Green Volkswagen Beetle" },
  { id: "supercharged", label: "Suzuki GSX 1200 Inazuma" },
  { id: "yacht", label: "Luxury Yacht" },
] as const;

export const reservationReasons = [
  { id: "shooting", label: "Photo / shooting" },
  { id: "wedding", label: "Wedding" },
  { id: "movie", label: "Movie / film" },
  { id: "music-video", label: "Music video / clip" },
  { id: "hamem", label: "Traditional hamem" },
  { id: "anniversary", label: "Anniversary" },
  { id: "branded-content", label: "Branded content" },
  { id: "other", label: "Other" },
] as const;

export function getReservationHref(vehicleId: string) {
  return `/experiences?vehicle=${vehicleId}#${RESERVATION_SECTION_ID}`;
}

const CDN = "https://www.astonmartin.com";

export const experiencesHero = {
  video: "/assets/videos/experiences-hero.mp4",
  poster: yachtDeepBlue,
};

export const bloodlineSlides = [
  {
    id: "ascend-goodwood",
    eyebrow: "Highlights",
    label: "ASCEND | Goodwood",
    image: `${CDN}/-/media/experiences/q4-2025-refresh/landing-page/landing-page-highlights/highlight-2-ascend-goodwood.jpg?rev=-1`,
  },
  {
    id: "unleashed-sonoma",
    label: "UNLEASHED | Sonoma",
    image: `${CDN}/-/media/experiences/q4-2025-refresh/landing-page/landing-page-highlights/highlight-unleashed-sonoma.jpg?rev=-1`,
  },
  {
    id: "ascend-le-mans",
    label: "ASCEND| Le Mans",
    image: `${CDN}/-/media/experiences/q4-2025-refresh/landing-page/landing-page-highlights/highlight-5-ascend-le-mans.jpg?rev=-1`,
  },
  {
    id: "unleashed-cota",
    label: "UNLEASHED | COTA",
    image: `${CDN}/-/media/experiences/q4-2025-refresh/landing-page/landing-page-highlights/highlight-4-unleashed-cota.jpg?rev=-1`,
  },
  {
    id: "ascend-goodwood-2",
    label: "ASCEND | Goodwood",
    image: `${CDN}/-/media/experiences/q4-2025-refresh/landing-page/landing-page-highlights/highlight-6-ascend-goodwood.jpg?rev=-1`,
  },
  {
    id: "unleashed-barcelona",
    label: "UNLEASHED | Barcelona",
    image: `${CDN}/-/media/experiences/q4-2025-refresh/landing-page/landing-page-highlights/highlight-unleashed-barc-bike.jpg?rev=-1`,
  },
];

export const experiencePrograms = [
  {
    id: "ascend",
    title: "PEUGEOT 304",
    description:
      "A beautifully preserved Peugeot 304, ready for your next production or celebration. Ideal for film shoots, music videos, photo sessions, weddings, traditional hamem ceremonies, anniversaries, and branded content — with a timeless French silhouette that photographs beautifully on camera and on the road.",
    images: [
      peugeot304Forest,
      peugeot304Museum,
      peugeot304Interior,
      peugeot304Night,
      peugeot304Drone,
    ],
    image: peugeot304Forest,
    ctaLabel: "Book",
    align: "left" as const,
  },
  {
    id: "supertours",
    title: "VOLKSWAGEN BEETLE",
    description:
      "A stunning restored white Volkswagen Beetle — an icon of classic motoring, perfect for productions and celebrations that call for charm and character. Available for film shoots, music videos, photo sessions, weddings, traditional hamem ceremonies, anniversaries, and branded content, with a look that stands out beautifully in every frame.",
    images: [
      vwBeetleWhiteRestored,
      vwBeetleWhiteFront,
      vwBeetleWhiteParked,
      vwBeetleInterior,
      vwBeetleCockpit,
    ],
    image: vwBeetleWhiteRestored,
    ctaLabel: "Book",
    align: "right" as const,
  },
  {
    id: "unleashed",
    title: "GREEN BEETLE",
    description:
      "A striking restored green Volkswagen Beetle — bold, nostalgic, and full of personality for shoots and special occasions. Perfect for film productions, music videos, photo sessions, weddings, traditional hamem ceremonies, anniversaries, and branded content, with a rich vintage colour that brings depth and drama to every scene.",
    images: [
      vwGreenRestored,
      vwGreenFront,
      vwGreenVintage,
      vwGreenStone,
      vwBeetleInterior,
    ],
    image: vwGreenRestored,
    ctaLabel: "Book",
    align: "left" as const,
  },
  {
    id: "supercharged",
    title: "SUZUKI INAZUMA",
    description:
      "A powerful Suzuki GSX 1200 Inazuma — a 1990s superbike legend, ready to electrify your next shoot or event. Ideal for film productions, music videos, photo sessions, weddings, traditional hamem ceremonies, anniversaries, and branded content, with aggressive lines and authentic Japanese muscle that delivers attitude on camera.",
    images: [suzukiInazuma, suzukiInazumaRestored, suzukiInazumaAlt],
    image: suzukiInazuma,
    ctaLabel: "Book",
    align: "right" as const,
  },
  {
    id: "yacht",
    title: "LUXURY YACHT",
    description:
      "A magnificent luxury yacht available for productions and prestigious events on the water. Perfect for film shoots, music videos, photo sessions, weddings, traditional hamem celebrations, anniversaries, and high-end branded content — offering open sea, cinematic horizons, and an unmistakable sense of elegance behind every shot.",
    images: [yachtDeepBlue, yachtSuperyachtOcean, yachtLuxuryWaves],
    image: yachtDeepBlue,
    ctaLabel: "Book",
    align: "left" as const,
  },
];
