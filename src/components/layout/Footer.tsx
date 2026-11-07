import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { footerNav } from "@/data/homePage";

export default function Footer() {
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const footer = document.querySelector(".global-footer");
    footer?.classList.add("active");
  }, []);

  return (
    <footer className="global-footer var-white active">
      <div className="global-footer-top">
        <nav className="global-footer-accordion">
          {[
            { title: "Navigation", links: footerNav.navigation },
            { title: "Contact", links: footerNav.contact },
            { title: "Corporate", links: footerNav.corporate },
          ].map((group) => (
            <div key={group.title}>
              <button type="button" className="global-footer-accordion-collapsible">
                {group.title}
                <span className="global-footer-accordion-icon" role="presentation" aria-hidden="true" />
              </button>
              <div className="global-footer-accordion-panel">
                <ul className="footer-links">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>

        <div className="global-footer-dealer">
          <label htmlFor="dealer">Find a dealer</label>
          <div className="global-footer-dealer-field">
            <input type="text" placeholder="Town/Postcode" id="dealer" />
            <Icon name="search" width={15} height={15} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="global-footer-copy">
        <p>
          <a href="https://www.astonmartin.com/-/media/corporate/corporatearchive/documents/modern-slavery-statement-2025.pdf">
            &gt; Modern Slavery Statement
          </a>
        </p>
        <p>&nbsp;</p>
        <p>
          The emissions/fuel economy figures quoted are sourced from official regulated test results obtained through laboratory testing.
          They are for comparability purposes only and may not reflect your real driving experience.
        </p>
        <br />
        <p>
          <a href="https://www.astonmartin.com/en/legal/WLTP">&gt; WLTP - CONSUMPTION AND EMISSION VALUES</a>
        </p>
      </div>

      <div className="global-footer-bottom">
        <div className="language-switcher">
          <button type="button" className="language-switcher-open" onClick={() => setLangOpen((v) => !v)}>
            United States
            <Icon name="chevron-top" width="100%" height="100%" aria-label="Open language switcher" />
          </button>
          {langOpen ? (
            <div className="language-switcher-popup active">
              <ul>
                <li><a className="active" href="https://www.astonmartin.com/en-us">United States</a></li>
                <li><a href="https://www.astonmartin.com/en-gb">United Kingdom</a></li>
                <li><a href="https://www.astonmartin.com/de">Deutschland</a></li>
                <li><a href="https://www.astonmartin.com/ja">日本</a></li>
                <li><a href="https://www.astonmartin.com/fr">France</a></li>
                <li><a href="https://www.astonmartin.com/en-au">Australia</a></li>
                <li><a href="https://www.astonmartin.com/zh-cn">中文（简体）</a></li>
                <li><a href="https://www.astonmartin.com/en">International site</a></li>
              </ul>
              <button type="button" className="language-switcher-close" onClick={() => setLangOpen(false)}>
                <Icon name="close" width={15} height={15} aria-label="Close language switcher" />
              </button>
            </div>
          ) : null}
        </div>

        <div className="global-footer-bottom-right">
          <nav className="global-footer-privacy">
            <ul>
              <li><a href="https://www.astonmartin.com/en-us/legal/terms-and-conditions">Terms &amp; Conditions</a></li>
              <li><a href="https://www.astonmartin.com/en-us/legal/privacy">Privacy</a></li>
              <li><a href="https://www.astonmartin.com/en-us/legal/cookies">Cookies</a></li>
            </ul>
          </nav>
          <div className="global-footer-copyright">&copy; Aston Martin 2026</div>
        </div>
      </div>
    </footer>
  );
}
