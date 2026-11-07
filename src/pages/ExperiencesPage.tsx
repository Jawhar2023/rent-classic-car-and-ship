import { useEffect } from "react";
import { useDocHeight } from "@/hooks/useDocHeight";
import { useHeaderSticky } from "@/hooks/useHeaderSticky";
import { useSvgSprite } from "@/hooks/useSvgSprite";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExperiencesHero from "@/components/experiences/ExperiencesHero";
import ExperienceProgramBlock from "@/components/experiences/ExperienceProgramBlock";
import ExperienceReservation from "@/components/experiences/ExperienceReservation";
import ScrollReveal from "@/components/experiences/ScrollReveal";
import { experiencePrograms } from "@/data/experiencesPage";

export default function ExperiencesPage() {
  useDocHeight();
  useSvgSprite();
  useHeaderSticky();

  useEffect(() => {
    document.documentElement.classList.remove("snap");
    document.body.className = "pagemode-normal booted";
    document.body.classList.remove("intro-active", "noscroll");
    document.body.setAttribute("data-page", "experiences-page");
    document.body.setAttribute("data-lang", "en-US");
    document.body.setAttribute("data-svg-url", "/assets/images/svg-sprite.svg");
    document.title = "Rent cars | Trillium Agency";
    window.scrollTo(0, 0);

    const readyTimer = window.setTimeout(() => {
      document.querySelector(".experiences-page")?.classList.add("experiences-page--ready");
    }, 120);

    return () => window.clearTimeout(readyTimer);
  }, []);

  return (
    <>
      <Header />
      <main className="page page--light experiences-page" role="main">
        <ExperiencesHero />

        {experiencePrograms.map((program, index) => (
          <ScrollReveal key={program.id} delay={index % 2 === 0 ? 0 : 120}>
            <ExperienceProgramBlock program={program} />
          </ScrollReveal>
        ))}

        <ScrollReveal>
          <ExperienceReservation />
        </ScrollReveal>
      </main>
      <div className="block">
        <section role="contentinfo">
          <Footer />
        </section>
      </div>
    </>
  );
}
