import { useEffect, useMemo, useRef } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import { modelSlides } from "@/data/homePage";
import type { ModelSlide } from "@/types/home";

function ModelMedia({ slide }: { slide: ModelSlide }) {
  if (!slide.image) return null;

  return (
    <div className="models-slide-media layout-full" aria-hidden="true">
      <img className="models-slide-media__img" src={slide.image} alt={slide.title} />
    </div>
  );
}

function ModelContent({ slide }: { slide: ModelSlide }) {
  return (
    <div className="models-vehicle-carousel-gradient">
      <div className="models-vehicle-carousel-container">
        <div className="models-vehicle-carousel-content">
          <div className="models-vehicle-carousel-content_eyebrow">{slide.eyebrow}</div>
          <div className="models-vehicle-carousel-content_title">{slide.title}</div>
        </div>
        <div className="models-vehicle-carousel-cta-button-container">
          <a
            className="cta_button cta_button--primary-dark models-vehicle-carousel-cta-button"
            href={slide.exploreHref}
          >
            Explore
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ModelsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const animateNavigation = () => {
    const prev = controlsRef.current?.querySelector<HTMLElement>(".swiper-button-prev");
    const next = controlsRef.current?.querySelector<HTMLElement>(".swiper-button-next");
    if (!prev || !next) return;

    prev.classList.remove("animate-prev");
    next.classList.remove("animate-next");
    void prev.offsetWidth;
    prev.classList.add("animate-prev");
    next.classList.add("animate-next");
  };

  const swiperOptions = useMemo(
    () => ({
      modules: [Navigation],
      loop: false,
      rewind: true,
      speed: 800,
      slidesPerView: 1,
      navigation: {
        nextEl: ".models-carousel_navigation.swiper-button-next",
        prevEl: ".models-carousel_navigation.swiper-button-prev",
      },
      on: {
        init() {
          animateNavigation();
        },
        slideChange() {
          animateNavigation();
        },
      },
    }),
    [],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const swiper = new Swiper(el, swiperOptions);
    return () => swiper.destroy(true, true);
  }, [swiperOptions]);

  return (
    <section
      id="models"
      className="models-vehicle-carousel"
      data-config={`{"delay":"0", "loop":false, "carousel":true,"slideCount":"${modelSlides.length}"}`}
    >
      <div className="swiper swiper-container" ref={containerRef}>
        <div className="swiper-wrapper">
          {modelSlides.map((slide, index) => (
            <div key={slide.id} className="swiper-slide" data-swiper-slide-index={index}>
              <ModelMedia slide={slide} />
              <ModelContent slide={slide} />
            </div>
          ))}
        </div>

        <div id="models-vehicle-carousel-swiper-controls" ref={controlsRef}>
          <div className="models-carousel_navigation swiper-button-prev" />
          <div className="models-carousel_navigation swiper-button-next" />
        </div>
      </div>
    </section>
  );
}
