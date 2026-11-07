import { useEffect } from "react";
import { useDocHeight } from "@/hooks/useDocHeight";
import { useHeaderSticky } from "@/hooks/useHeaderSticky";
import { useSvgSprite } from "@/hooks/useSvgSprite";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/home/Preloader";
import HeroCarousel from "@/components/home/HeroCarousel";
import ModelsCarousel from "@/components/home/ModelsCarousel";
import PromoSection from "@/components/home/PromoSection";
import StoriesBlock from "@/components/home/StoriesBlock";
import NewsSection from "@/components/home/NewsSection";

export default function HomePage() {
  useDocHeight();
  useSvgSprite();
  useHeaderSticky();

  useEffect(() => {
    document.documentElement.classList.add("snap");
    document.body.className = "pagemode-normal";
    document.body.setAttribute("data-page", "home-page-v2");
    document.body.setAttribute("data-lang", "en-US");
    document.body.setAttribute("data-svg-url", "/assets/images/svg-sprite.svg");

    const removeSnap = () => document.documentElement.classList.remove("snap");
    window.setTimeout(removeSnap, 800);
  }, []);

  return (
    <>
      <Preloader />
      <Header />

      <main className="page page--light" role="main">
        <HeroCarousel />
        <ModelsCarousel />
        <PromoSection />
        <StoriesBlock />
        <NewsSection />
      </main>

      <div className="block">
        <section role="contentinfo">
          <Footer />
        </section>
      </div>
    </>
  );
}
