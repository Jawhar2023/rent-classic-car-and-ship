import { useEffect, useMemo, useRef } from "react";
import Swiper from "swiper";
import { FreeMode } from "swiper/modules";
import { stories } from "@/data/homePage";
import { getReservationHref } from "@/data/experiencesPage";

export default function StoriesBlock() {
  const containerRef = useRef<HTMLDivElement>(null);

  const swiperOptions = useMemo(
    () => ({
      modules: [FreeMode],
      slidesPerView: "auto" as const,
      spaceBetween: 16,
      freeMode: true,
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
    <section className="stories-block">
      <div className="stories-block--container">
        <h1 className="stories-block--container-heading">Our Yacht</h1>
        <a className="cta_button cta_button--primary-light read-all-cta" href={getReservationHref("yacht")}>
          Book Now
          <div className="cta_icon--primary-light" />
        </a>

        <div className="stories-block--container__tiles">
          {stories.map((story) => (
            <div key={story.id} className="stories-block--container__tiles-content">
              <a href={story.href} className="tile-link">
                <div className="stories-block--container__tiles-content-image">
                  <img src={story.image} alt={story.title} loading="eager" />
                </div>
                <div className="stories-block--container__tiles-content-textblock">
                  <div className="stories-block--container__tiles-content-eyebrow">{story.category}</div>
                  <h3 className="stories-block--container__tiles-content-title">{story.title}</h3>
                  <div className="stories-block--container__tiles-content-subtitle">{story.date}</div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div
          className="stories-block--container__swiper swiper-container stories-block-with-cta"
          ref={containerRef}
        >
          <div className="swiper-wrapper">
            {stories.map((story) => (
              <div key={`mobile-${story.id}`} className="swiper-slide">
                <div className="stories-block_swiper-tile">
                  <a href={story.href} className="tile-link">
                    <div className="stories-block-tile">
                      <div className="stories-block-tile__image">
                        <img src={story.image} alt={story.title} loading="eager" />
                      </div>
                      <div className="stories-block-tile__textblock">
                        <div className="stories-block-tile__eyebrow">{story.category}</div>
                        <h3 className="stories-block-tile__title">{story.title}</h3>
                        <div className="stories-block-tile__subtitle">{story.date}</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
