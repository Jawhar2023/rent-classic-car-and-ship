import { BRAND_LOGO, BRAND_NAME } from "@/data/brand";

export default function PreloaderLogo() {
  return (
    <img
      className="preloader-v4__logo"
      src={BRAND_LOGO}
      alt={BRAND_NAME}
      width={325}
      height={154}
      draggable={false}
    />
  );
}
