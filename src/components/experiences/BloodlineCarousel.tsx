import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import Icon from "@/components/Icon";
import { bloodlineSlides } from "@/data/experiencesPage";

export default function BloodlineCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const prevEl = prevRef.current;
    const nextEl = nextRef.current;
    if (!el || !prevEl || !nextEl) return;

    const swiper = new Swiper(el, {
      modules: [Navigation],
      slidesPerView: 1,
      speed: 900,
      loop: true,
      navigation: { prevEl, nextEl },
    });

    swiper.navigation.init();
    swiper.navigation.update();

    const restartBtn = el.querySelector<HTMLButtonElement>(".bloodline-carousel-restart");
    const onRestart = () => swiper.slideToLoop(0, 900);
    restartBtn?.addEventListener("click", onRestart);

    return () => {
      restartBtn?.removeEventListener("click", onRestart);
      swiper.destroy(true, true);
    };
  }, []);

  return (
    <section className="bloodline-carousel" aria-label="Bloodline">
      <div className="swiper-container" ref={containerRef}>
        <div className="swiper-wrapper">
          {bloodlineSlides.map((slide) => (
            <div key={slide.id} className="swiper-slide">
              <picture>
                <source media="(min-width: 768px)" srcSet={slide.image} />
                <source media="(min-width: 1px)" srcSet={slide.image} />
                <img src={slide.image} alt={slide.label} />
              </picture>
              <div className="swiper-slide-header">
                {slide.eyebrow ? <p className="swiper-slide-header-eyebrow">{slide.eyebrow}</p> : null}
              </div>
              <div className="swiper-slide-footer">
                <p className="swiper-slide-footer-description">{slide.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-navigation">
          <button
            ref={prevRef}
            type="button"
            className="bloodline_navigation swiper-button-prev"
            aria-label="Go to Previous Slide"
          >
            <Icon name="arrow-right" viewBox="0 0 24 24" aria-hidden="true" />
          </button>
          <button
            ref={nextRef}
            type="button"
            className="bloodline_navigation swiper-button-next"
            aria-label="Go to Next Slide"
          >
            <Icon name="arrow-right" viewBox="0 0 24 24" aria-hidden="true" />
          </button>
        </div>

        <button type="button" className="bloodline-carousel-restart" aria-label="Start again">
          <Icon name="arrow-right" viewBox="0 0 24 24" aria-hidden="true" />
          Start again
        </button>

        <p className="bloodline-carousel-helpText">
          <Icon name="arrow-right" viewBox="0 0 24 24" aria-hidden="true" />
          Click here to explore
        </p>
      </div>
    </section>
  );
}
