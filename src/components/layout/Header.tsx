import { useState } from "react";
import { useLocation } from "react-router-dom";
import Icon from "@/components/Icon";
import MainNavigation from "@/components/layout/MainNavigation";
import { BRAND_LOGO, BRAND_NAME } from "@/data/brand";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const isLightNavPage =
    location.pathname.startsWith("/experiences") || location.pathname.startsWith("/lazerocare/about");

  const closeNav = () => {
    setNavOpen(false);
    document.body.classList.remove("nav-open", "noscroll");
  };
  const openNav = () => {
    setNavOpen(true);
    document.body.classList.add("nav-open", "noscroll");
  };

  return (
    <>
      <header
        className={`global-header-v2 no-transparent${isLightNavPage ? " global-header-v2--experiences global-header-v2--lazerocare" : ""}`}
        role="banner"
        data-sticky-elm
      >
        <div className="header-wrapper">
          <div className="left-panel">
            <button
              type="button"
              className={`hamburger${navOpen ? " hide" : ""}`}
              aria-label="Navigation Menu"
              aria-controls="global-navigation-v2"
              aria-expanded={navOpen}
              onClick={openNav}
            >
              <Icon name="hamburger" label="Hamburger Icon" width="100%" height="100%" />
            </button>
            <button
              type="button"
              className={`close-icon${navOpen ? "" : " hide"}`}
              aria-label="Close Menu"
              onClick={closeNav}
            >
              <Icon name="close" width="100%" height="100%" />
            </button>
          </div>
          <a className="header-logo header-logo--trillium" aria-label={BRAND_NAME} href="/">
            <img
              className="header-logo__img"
              src={BRAND_LOGO}
              alt={BRAND_NAME}
              width={325}
              height={154}
              draggable={false}
            />
          </a>
          <div className="right-panel" aria-hidden="true" />
        </div>
      </header>
      <MainNavigation open={navOpen} onClose={closeNav} />
    </>
  );
}
