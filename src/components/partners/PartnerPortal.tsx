import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/Icon";
import { BRAND_LOGO, BRAND_NAME } from "@/data/brand";

type PartnerPortalProps = {
  siteUrl: string;
  siteTitle: string;
  documentTitle: string;
  dataPage: string;
  aboutPath?: string;
  aboutLabel?: string;
};

export default function PartnerPortal({
  siteUrl,
  siteTitle,
  documentTitle,
  dataPage,
  aboutPath,
  aboutLabel,
}: PartnerPortalProps) {
  useEffect(() => {
    document.documentElement.classList.remove("snap");
    document.body.className = "pagemode-normal booted partner-portal-body";
    document.body.classList.remove("intro-active", "noscroll");
    document.body.setAttribute("data-page", dataPage);
    document.title = documentTitle;
    return () => document.body.classList.remove("partner-portal-body");
  }, [dataPage, documentTitle]);

  return (
    <div className="partner-portal">
      <header className="partner-portal__bar">
        <Link className="partner-portal__back" to="/">
          <Icon name="arrow-right" aria-hidden="true" />
          Back to Trillium Agency
        </Link>

        <a className="partner-portal__brand" href="/" aria-label={BRAND_NAME}>
          <img src={BRAND_LOGO} alt={BRAND_NAME} width={140} height={66} draggable={false} />
        </a>

        <div className="partner-portal__actions">
          {aboutPath && aboutLabel ? (
            <Link className="partner-portal__link" to={aboutPath}>
              {aboutLabel}
            </Link>
          ) : null}
          <a
            className="partner-portal__link partner-portal__link--accent"
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in new tab
          </a>
        </div>
      </header>

      <iframe
        className="partner-portal__frame"
        src={siteUrl}
        title={siteTitle}
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
