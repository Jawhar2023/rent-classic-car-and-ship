import { useEffect } from "react";

const LIGHT_SECTIONS = ".stories-block, .news-section, .long-text-block, .experiences-reservation";
const HEADER_HEIGHT = 64;

function isLightSectionBehindHeader(): boolean {
  const sections = document.querySelectorAll(LIGHT_SECTIONS);
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top < HEADER_HEIGHT && rect.bottom > HEADER_HEIGHT) {
      return true;
    }
  }
  return false;
}

export function useHeaderSticky() {
  useEffect(() => {
    const header = document.querySelector(".global-header-v2");
    if (!header) return;

    header.classList.add("active");

    const onScroll = () => {
      header.classList.toggle("sticky", window.scrollY > 0);
      header.classList.toggle("var-dark", isLightSectionBehindHeader());
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
