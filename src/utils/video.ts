const MEDIA_BASE = "https://www.astonmartin.com";

export function absUrl(src: string): string {
  if (!src) return "";
  if (/^https?:/.test(src)) return src;
  return MEDIA_BASE + (src.startsWith("/") ? src : `/${src}`);
}

export function pickVideoSrc(source: HTMLSourceElement | null): string {
  if (!source) return "";
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  return (
    (mobile && source.getAttribute("data-mobile-src")) ||
    source.getAttribute("data-src") ||
    source.getAttribute("data-video-normaldef") ||
    ""
  );
}

export function markHeroPreloaded(wrap: HTMLElement): void {
  const hero = wrap.closest(".hero-full");
  if (!hero || hero.classList.contains("preloaded")) return;
  hero.classList.add("preloaded");
  window.dispatchEvent(new CustomEvent("hero:preloaded"));
}

export function setupVideoWrap(wrap: HTMLElement): void {
  const video = wrap.querySelector("video");
  const source = wrap.querySelector("source");
  const src = pickVideoSrc(source);
  if (!video || !src) return;

  video.src = absUrl(src);
  video.muted = true;
  video.playsInline = true;

  const onReady = () => markHeroPreloaded(wrap);
  video.addEventListener("canplaythrough", onReady, { once: true });
  video.addEventListener("loadeddata", onReady, { once: true });

  wrap.classList.add("video--loaded");
  wrap.setAttribute("data-video-state", "loaded");

  const cover = wrap.querySelector<HTMLElement>("[data-video-cover]");
  if (cover) {
    const landscape = cover.querySelector("[data-landscape-img-src]");
    const portrait = cover.querySelector("[data-portrait-img-src]");
    const imgSrc =
      landscape?.getAttribute("data-landscape-img-src") ||
      portrait?.getAttribute("data-portrait-img-src");
    if (imgSrc) {
      cover.style.backgroundImage = `url(${absUrl(imgSrc)})`;
      cover.style.backgroundSize = "cover";
      cover.style.backgroundPosition = "center";
    }
  }
}

export function playSlideVideo(slide: Element | undefined): void {
  slide?.querySelector("video")?.play().catch(() => undefined);
}

export function pauseOtherVideos(slides: Element[], activeSlide: Element | undefined): void {
  slides.forEach((slide) => {
    const video = slide.querySelector("video");
    if (video && slide !== activeSlide) video.pause();
  });
}
