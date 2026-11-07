import { mainNavLinks } from "@/data/homePage";
import Icon from "@/components/Icon";

interface MainNavigationProps {
  open: boolean;
  onClose: () => void;
}

export default function MainNavigation({ open, onClose }: MainNavigationProps) {
  return (
    <nav
      className="global-navigation-v2"
      id="global-navigation-v2"
      data-state={open ? "open" : "closed"}
      aria-expanded={open}
    >
      <div className="controls">
        <button type="button" className="back-btn" aria-label="Back">
          <Icon name="arrow-right" viewBox="0 0 24 24" />
        </button>
        <div className="mobile-sub-header" />
        <button type="button" className="close-btn" aria-label="Close menu" onClick={onClose} />
      </div>
      <div className="content">
        <ul aria-expanded={open} className="nav-panel level1">
          {mainNavLinks.map((link) => (
            <li key={link.label}>
              <a
                className="nav-item"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={onClose}
              >
                <div>{link.label}</div>
                <Icon name="chevron-right" viewBox="0 0 24 24" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
