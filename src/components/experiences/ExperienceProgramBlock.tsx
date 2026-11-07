import type { experiencePrograms } from "@/data/experiencesPage";
import { getReservationHref } from "@/data/experiencesPage";
import ProgramMediaCarousel from "@/components/experiences/ProgramMediaCarousel";

type Program = (typeof experiencePrograms)[number];

export default function ExperienceProgramBlock({ program }: { program: Program }) {
  const imageFirst = program.align === "left";

  return (
    <div className="block experience-program-block">
      <section className={`long-text-block var-white justify-${program.align}`}>
        <div className="container gutter">
          <div className={`experience-program__layout experience-program__layout--${program.align}`}>
            {imageFirst ? (
              <>
                <div className="experience-program__media">
                  <ProgramMediaCarousel program={program} />
                </div>
                <ProgramCopy program={program} />
              </>
            ) : (
              <>
                <ProgramCopy program={program} />
                <div className="experience-program__media">
                  <ProgramMediaCarousel program={program} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgramCopy({ program }: { program: Program }) {
  return (
    <div className="experience-program__copy">
      <div className="claim">
        <div className="claim-in">
          {program.eyebrow ? (
            <p className="experience-program__eyebrow">{program.eyebrow}</p>
          ) : null}
          <h3 className="experience-program__title">{program.title}</h3>
          <p className="experience-program__description">{program.description}</p>
          {program.highlights?.length ? (
            <ul className="experience-program__highlights">
              {program.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <div className="long-text-cta-button-container">
            <a className="cta_button cta_button--primary-light" href={getReservationHref(program.id)}>
              {program.ctaLabel ?? "Book"}
              <div className="cta_icon--primary-light" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
