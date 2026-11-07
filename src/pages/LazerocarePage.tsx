import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDocHeight } from "@/hooks/useDocHeight";
import { useHeaderSticky } from "@/hooks/useHeaderSticky";
import { useSvgSprite } from "@/hooks/useSvgSprite";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/Icon";
import {
  LAZEROCARE_SITE_URL,
  lazerocareAbout,
  lazerocareHero,
  lazerocareServices,
  lazerocareStats,
} from "@/data/lazerocarePage";

export default function LazerocarePage() {
  useDocHeight();
  useSvgSprite();
  useHeaderSticky();

  useEffect(() => {
    document.documentElement.classList.remove("snap");
    document.body.className = "pagemode-normal booted";
    document.body.classList.remove("intro-active", "noscroll");
    document.body.setAttribute("data-page", "lazerocare-page");
    document.body.setAttribute("data-lang", "en-US");
    document.body.setAttribute("data-svg-url", "/assets/images/svg-sprite.svg");
    document.title = "Lazerocare | Trillium Agency";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="page page--light lazerocare-page" role="main">
        <section className="lazerocare-hero">
          <div className="lazerocare-hero__glow lazerocare-hero__glow--left" aria-hidden="true" />
          <div className="lazerocare-hero__glow lazerocare-hero__glow--right" aria-hidden="true" />
          <div className="lazerocare-hero__inner">
            <p className="lazerocare-hero__eyebrow">{lazerocareHero.eyebrow}</p>
            <h1 className="lazerocare-hero__title">{lazerocareHero.title}</h1>
            <p className="lazerocare-hero__subtitle">{lazerocareHero.subtitle}</p>
            <div className="lazerocare-hero__actions">
              <Link className="lazerocare-btn lazerocare-btn--primary" to="/lazerocare">
                Visit official website
                <Icon name="arrow-right" aria-hidden="true" />
              </Link>
              <a
                className="lazerocare-btn lazerocare-btn--ghost"
                href={LAZEROCARE_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in new tab
              </a>
            </div>
          </div>
        </section>

        <section className="lazerocare-about">
          <div className="lazerocare-about__grid">
            <div>
              <h2>{lazerocareAbout.heading}</h2>
              {lazerocareAbout.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="lazerocare-stats">
              {lazerocareStats.map((stat) => (
                <article key={stat.label} className="lazerocare-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lazerocare-services">
          <div className="lazerocare-services__header">
            <h2>Core services</h2>
            <p>Discover what NÉOVITA LASEROCARE offers across Tunisia, France, Morocco, and beyond.</p>
          </div>
          <div className="lazerocare-services__grid">
            {lazerocareServices.map((service) => (
              <article key={service.id} className="lazerocare-service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lazerocare-cta">
          <h2>Ready to explore the full experience?</h2>
          <p>
            Enter the official NÉOVITA LASEROCARE platform inside Trillium — with a clear way back to our main
            website at any time.
          </p>
          <Link className="lazerocare-btn lazerocare-btn--primary" to="/lazerocare">
            Enter NÉOVITA LASEROCARE
            <Icon name="arrow-right" aria-hidden="true" />
          </Link>
        </section>
      </main>
      <div className="block">
        <section role="contentinfo">
          <Footer />
        </section>
      </div>
    </>
  );
}
