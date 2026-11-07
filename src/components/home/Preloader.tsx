import { useEffect, useRef, useState } from "react";
import PreloaderLogo from "@/components/home/PreloaderLogo";

const ACTIVE_DELAY = 30;
const FADEOUT_DELAY = 2450;
const MAX_HERO_WAIT = 3500;

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "fadeout" | "done">("loading");
  const preloaderRef = useRef<HTMLDivElement>(null);
  const fadeoutStarted = useRef(false);

  useEffect(() => {
    document.body.classList.add("noscroll", "intro-active");
    document.body.classList.remove("booted");

    const activeTimer = window.setTimeout(() => {
      preloaderRef.current?.classList.add("active");
    }, ACTIVE_DELAY);

    const startFadeout = () => {
      if (fadeoutStarted.current) return;
      fadeoutStarted.current = true;
      setPhase("fadeout");
    };

    const fadeoutTimer = window.setTimeout(() => {
      const hero = document.querySelector(".hero-full:not(.preloaded)");

      if (hero) {
        const maxWaitTimer = window.setTimeout(startFadeout, MAX_HERO_WAIT);
        const observer = new MutationObserver((mutations) => {
          const mutation = mutations[0];
          if (
            mutation.attributeName === "class" &&
            hero.classList.contains("preloaded")
          ) {
            window.clearTimeout(maxWaitTimer);
            observer.disconnect();
            startFadeout();
          }
        });
        observer.observe(hero, { attributes: true });
      } else {
        startFadeout();
      }
    }, FADEOUT_DELAY);

    return () => {
      window.clearTimeout(activeTimer);
      window.clearTimeout(fadeoutTimer);
      document.body.classList.remove("noscroll", "intro-active");
    };
  }, []);

  useEffect(() => {
    if (phase !== "fadeout") return;

    const el = preloaderRef.current;
    if (!el) return;

    const finish = () => {
      document.body.classList.remove("noscroll", "intro-active");
      document.body.classList.add("booted");
      window.dispatchEvent(new CustomEvent("intro:complete"));
      setPhase("done");
    };

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== el) return;
      event.stopPropagation();
      finish();
    };

    const safetyTimer = window.setTimeout(finish, 1200);

    el.addEventListener("transitionend", onTransitionEnd);
    return () => {
      window.clearTimeout(safetyTimer);
      el.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      ref={preloaderRef}
      className={`preloader-v4${phase === "fadeout" ? " fadeout" : ""}`}
      aria-label="Preloader"
    >
      <div className="preloader-v4__box">
        <div className="preloader-v4__cont">
          <div className="preloader-v4__wrap">
            <PreloaderLogo />
          </div>
        </div>
      </div>
    </div>
  );
}
