import { useCallback, useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import Icon from "@/components/Icon";
import { newsItems } from "@/data/homePage";

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top + 0.5 * rect.height >= 0 &&
    rect.left >= 0 &&
    rect.bottom - 0.5 * rect.height <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export default function NewsSection() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const nudgeTimer = useRef<number | null>(null);

  const toggleNudge = useCallback(() => {
    const el = swiperRef.current;
    if (!el) return;

    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (desktop) {
      el.classList.remove("nudge");
      return;
    }

    el.classList.toggle("nudge", isInViewport(el));
  }, []);

  const debouncedToggleNudge = useCallback(() => {
    if (nudgeTimer.current) window.clearTimeout(nudgeTimer.current);
    nudgeTimer.current = window.setTimeout(toggleNudge, 250);
  }, [toggleNudge]);

  useEffect(() => {
    const el = swiperRef.current;
    const prevEl = prevRef.current;
    const nextEl = nextRef.current;
    if (!el || !prevEl || !nextEl) return;

    const swiper = new Swiper(el, {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      grabCursor: true,
      speed: 700,
      rewind: true,
      slidesPerGroup: 1,
      navigation: { prevEl, nextEl },
      breakpoints: {
        768: {
          spaceBetween: 28,
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
        1280: {
          spaceBetween: 36,
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
      },
    });

    swiper.navigation.init();
    swiper.navigation.update();

    const desktopMq = window.matchMedia("(min-width: 1024px)");

    swiper.on("touchStart", () => el.classList.remove("nudge"));
    swiper.on("transitionEnd", () => {
      if (!desktopMq.matches) debouncedToggleNudge();
    });

    if (!desktopMq.matches) {
      window.addEventListener("scroll", debouncedToggleNudge, { passive: true });
      debouncedToggleNudge();
    }

    return () => {
      window.removeEventListener("scroll", debouncedToggleNudge);
      if (nudgeTimer.current) window.clearTimeout(nudgeTimer.current);
      swiper.destroy(true, true);
    };
  }, [debouncedToggleNudge]);

  return (
    <section className="block-v4 news-section var-white snap">
      <div className="news-section-stage">
        <button
          ref={prevRef}
          type="button"
          className="news-section-arrow news-section-arrow--prev"
          aria-label="Previous car"
        />

        <div className="news-section-carousel">
          <div className="swiper" ref={swiperRef}>
            <div className="swiper-wrapper">
              {newsItems.map((item) => (
                <div key={item.id} className="swiper-slide news-section-item">
                  <article className="news-section-card">
                    <a href={item.href} className="news-section-media" tabIndex={-1}>
                      <img src={item.image} alt={item.title} loading="eager" />
                    </a>
                    <div className="news-section-card-body">
                      <time className="news-section-date">{item.date}</time>
                      <h3 className="news-section-card-title">{item.title}</h3>
                      <a href={item.href} className="news-section-explore-btn">
                        <span className="news-section-explore-btn__text">Explore</span>
                        <span className="news-section-explore-btn__icon" aria-hidden="true">
                          <Icon name="arrow-right" />
                        </span>
                      </a>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          ref={nextRef}
          type="button"
          className="news-section-arrow news-section-arrow--next"
          aria-label="Next car"
        />
      </div>
    </section>
  );
}
