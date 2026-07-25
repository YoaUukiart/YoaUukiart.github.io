import { ProjectCarousel } from "@/components/project-carousel";
import { SitePanels } from "@/components/site-panels";
import { portfolio, projects } from "@/content/portfolio";

export default function Home() {
  return (
    <main id="top">
      <SitePanels
        selected={
          <>
            <section className="intro-section" aria-labelledby="page-title">
              <p className="intro-section__eyebrow">{portfolio.eyebrow}</p>
              <div className="intro-section__copy">
                <h1 id="page-title">{portfolio.headline}</h1>
                <p>{portfolio.intro}</p>
              </div>
            </section>

            <section className="selected-section" aria-label="Selected projects">
              {projects.map((project, index) => (
                <ProjectCarousel
                  key={project.slug}
                  projectNumber={index + 1}
                  title={project.title}
                  year={project.year}
                  medium={project.medium}
                  description={project.description}
                  works={project.works}
                />
              ))}
            </section>
          </>
        }
        archive={
          <section className="archive-section" aria-label="Artwork archive">
            {projects.map((project, index) => (
              <ProjectCarousel
                key={`archive-${project.slug}`}
                variant="archive"
                projectNumber={index + 1}
                title={project.title}
                year={project.year}
                medium={project.medium}
                description={project.description}
                works={project.works}
              />
            ))}
          </section>
        }
        about={
          <section className="about-section" aria-labelledby="about-title">
            <div className="about-layout">
              <h2 id="about-title">{portfolio.aboutTitle}</h2>

              <div className="about-layout__body">
                {portfolio.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <aside className="about-facts" aria-label="艺术家信息">
                {portfolio.facts.map((fact) => (
                  <div key={fact.label}>
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </div>
                ))}
              </aside>
            </div>
          </section>
        }
        contact={
          <section className="contact-section" aria-labelledby="contact-title">
            <div>
              <p>Contact / Commissions</p>
              <span>{portfolio.year}</span>
            </div>
            <h2 id="contact-title">{portfolio.contactTitle}</h2>
            <p>{portfolio.contactText}</p>
            <a href={`mailto:${portfolio.email}`}>
              {portfolio.email}
              <span aria-hidden="true">↗</span>
            </a>
          </section>
        }
      />
    </main>
  );
}
