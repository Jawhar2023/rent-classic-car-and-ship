import Icon from "@/components/Icon";
import { promoBlocks } from "@/data/homePage";

export default function PromoSection() {
  return (
    <div className="block-v4 promo-v4 var-dark var-50-50">
      {promoBlocks.map((promo) => (
        <section key={promo.id} className="cmp-promo-v4 snap">
          <picture className="cover">
            <source media="(min-width: 768px)" srcSet={promo.image} />
            <source media="(min-width: 1px)" srcSet={promo.image} />
            <img className="responsive-image" src={promo.image} alt={promo.title} loading="eager" data-object-fit="cover" />
          </picture>
          <div className="copy">
            <h5>{promo.title}</h5>
            <p />
          </div>
          <div className="ctas">
            <a href={promo.href} target={promo.external ? "_blank" : undefined} rel={promo.external ? "noopener noreferrer" : undefined}>
              Explore
              <Icon name="arrow-right" aria-hidden="true" />
            </a>
          </div>
        </section>
      ))}
    </div>
  );
}
