import { useEffect, useMemo, useRef } from "react";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { heroSlides, EXPERIENCES_PATH } from "@/data/homePage";
import type { HeroSlide } from "@/types/home";
import Icon from "@/components/Icon";
import { pauseOtherVideos, playSlideVideo, setupVideoWrap, markHeroPreloaded } from "@/utils/video";

function HeroMedia({ slide }: { slide: HeroSlide }) {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) setupVideoWrap(videoRef.current);
  }, [slide.id]);

  if (slide.videoDesktop) {
    return (
      <div
        ref={videoRef}
        className="swiper-slide--video video layout-full"
        data-video-state="loading"
        data-swiper-parallax-duration={1000}
      >
        <div className="video__player" data-video-wrapper>
          <div className="video__cover" data-video-cover="data-video-cover">
            <div className="landscape" data-landscape-img-src={slide.posterDesktop ?? ""} />
            <div className="portrait" data-portrait-img-src={slide.posterMobile ?? slide.posterDesktop ?? ""} />
          </div>
          <video data-object-fit="cover" preload="metadata" playsInline muted loop>
            <source
              data-mobile-src={slide.videoMobile ?? slide.videoDesktop}
              data-src={slide.videoDesktop}
              data-video-normaldef={slide.videoDesktop}
            />
          </video>
        </div>
      </div>
    );
  }

  return (
    <picture className="layout-full hero-carousel-media">
      <source media="(min-width: 768px)" srcSet={slide.image} />
      <source
        media="(max-width: 767px) and (orientation: landscape)"
        srcSet={slide.image}
      />
      <source media="(min-width: 1px)" srcSet={slide.imageMobile ?? slide.image} />
      <img
        src={slide.image}
        alt={slide.title}
        onLoad={(event) => markHeroPreloaded(event.currentTarget)}
      />
    </picture>
  );
}

function HeroContent({ slide }: { slide: HeroSlide }) {
  const ctas =
    slide.ctas.length > 0
      ? slide.ctas
      : [{ label: "Explore", href: EXPERIENCES_PATH, variant: "primary-dark" as const }];

  return (
    <div className="hero-carousel-container hero-carousel-container--home">
      <div className="hero-carousel-content">
        <div className="hero-carousel-content_eyebrow">{slide.eyebrow ?? ""}</div>
        <div className="hero-carousel-content_title">
          <h1>{slide.title}</h1>
        </div>
        <div className="hero-carousel-content_text" />
      </div>
      <div className="hero-carousel-cta-button-container">
        {ctas.map((cta) => (
          <a
            key={cta.label}
            className={`cta_button cta_button--${cta.variant ?? "primary-dark"} hero-carousel-cta-button hero-carousel-cta`}
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
          >
            {cta.label}
            <div className={`cta_icon--${cta.variant ?? "primary-dark"}`}>
              {cta.label === "Explore" || cta.label === "Configure" ? (
                <Icon name="arrow-right" label="arrow-curved-right" />
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const swiperOptions = useMemo(
    () => ({
      modules: [Autoplay, Navigation, Pagination],
      loop: true,
      speed: 900,
      parallax: false,
      autoplay: { delay: 8000, disableOnInteraction: false },
      pagination: {
        el: "#hero-banner-swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".hero-banner_navigation.swiper-button-next",
        prevEl: ".hero-banner_navigation.swiper-button-prev",
      },
      on: {
        slideChange(this: Swiper) {
          const slide = this.slides[this.activeIndex];
          playSlideVideo(slide);
          pauseOtherVideos(Array.from(this.slides), slide);
        },
        init(this: Swiper) {
          playSlideVideo(this.slides[this.activeIndex]);
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
      className="hero-banner-carousel hero-full hero-model-derivative-banner snap"
      data-config='{"delay":"8000", "loop":true, "carousel":true, "slideCount":"6", "location":"Hero banner homepage"}'
    >
      <div className="swiper-container" ref={containerRef}>
        <div className="swiper-wrapper">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className="swiper-slide" data-swiper-slide-index={index}>
              <HeroMedia slide={slide} />
              <HeroContent slide={slide} />
            </div>
          ))}
        </div>

        <div id="hero-banner-swiper-pagination" className="hero-banner_progress swiper-pagination" />
        <div id="hero-banner-swiper-controls">
          <div className="hero-banner_navigation swiper-button-prev" />
          <div className="hero-banner_navigation swiper-button-next" />
        </div>
      </div>
    </section>
  );
}
