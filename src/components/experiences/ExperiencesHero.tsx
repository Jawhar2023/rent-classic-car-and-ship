import { useEffect, useRef } from "react";
import { experiencesHero } from "@/data/experiencesPage";

export default function ExperiencesHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => undefined);
  }, []);

  return (
    <section
      className="hero-banner-carousel hero-model-derivative-banner snap hero-model-banner experiences-hero experiences-hero--video"
      aria-label="Trillium Agency experiences"
    >
      <div className="experiences-hero__media">
        <video
          ref={videoRef}
          className="experiences-hero__video"
          poster={experiencesHero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={experiencesHero.video} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
