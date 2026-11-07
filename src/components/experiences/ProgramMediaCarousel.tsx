import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import type { experiencePrograms } from "@/data/experiencesPage";

type Program = (typeof experiencePrograms)[number];

export default function ProgramMediaCarousel({ program }: { program: Program }) {
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const slides = program.images?.length ? program.images : [program.image];
  const hasMultiple = slides.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;

    const el = swiperRef.current;
    const prevEl = prevRef.current;
    const nextEl = nextRef.current;
    if (!el || !prevEl || !nextEl) return;

    const swiper = new Swiper(el, {
      modules: [Navigation],
      slidesPerView: 1,
      speed: 650,
      loop: slides.length > 1,
      navigation: { prevEl, nextEl },
    });

    swiper.navigation.init();
    swiper.navigation.update();

    return () => swiper.destroy(true, true);
  }, [hasMultiple, slides.length, program.id]);

  return (
    <div className="experience-program__carousel">
      {hasMultiple ? (
        <>
          <button
            ref={prevRef}
            type="button"
            className="experience-program__arrow experience-program__arrow--prev"
            aria-label={`Previous ${program.title} photo`}
          />
          <div className="swiper experience-program__swiper" ref={swiperRef}>
            <div className="swiper-wrapper">
              {slides.map((src, index) => (
                <div key={`${program.id}-${index}`} className="swiper-slide">
                  <picture className="image-hero">
                    <img src={src} alt={`${program.title} — photo ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
                  </picture>
                </div>
              ))}
            </div>
          </div>
          <button
            ref={nextRef}
            type="button"
            className="experience-program__arrow experience-program__arrow--next"
            aria-label={`Next ${program.title} photo`}
          />
        </>
      ) : (
        <picture className="image-hero">
          <img src={slides[0]} alt={program.title} loading="lazy" />
        </picture>
      )}
    </div>
  );
}
