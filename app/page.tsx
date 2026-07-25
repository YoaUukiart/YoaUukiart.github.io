import { ProjectCarousel } from "@/components/project-carousel";
import { portfolio, projects } from "@/content/portfolio";

export default function Home() {
  return (
    <main id="top">
      <header className="minimal-header">
        <a className="minimal-header__name" href="#top" aria-label="回到首页">
          {portfolio.name}
        </a>

        <nav aria-label="主导航">
          <a href="#selected">Selected</a>
          <a href="#archive">Archive</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <span className="minimal-header__year">{portfolio.year}</span>
      </header>

      <section className="intro-section" aria-labelledby="page-title">
        <p className="intro-section__eyebrow">{portfolio.eyebrow}</p>
        <div className="intro-section__copy">
          <h1 id="page-title">{portfolio.headline}</h1>
          <p>{portfolio.intro}</p>
        </div>
        <a href="#selected" aria-label="前往精选作品">
          View selected project <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section
        className="selected-section"
        id="selected"
        aria-labelledby="selected-title"
      >
        <div className="section-bar">
          <h2 id="selected-title">Selected</h2>
          <span>{portfolio.year}</span>
          <span>{projects.length.toString().padStart(2, "0")} projects</span>
        </div>

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

      <section
        className="archive-section"
        id="archive"
        aria-labelledby="archive-title"
      >
        <div className="section-bar">
          <h2 id="archive-title">Archive</h2>
          <span>All works</span>
          <span>
            {projects.reduce(
              (total, project) => total + project.works.length,
              0,
            )}{" "}
            images
          </span>
        </div>

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

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="section-bar section-bar--light">
          <h2>About</h2>
          <span>Artist profile</span>
          <span>02</span>
        </div>

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

      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
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

      <footer className="site-footer">
        <strong>{portfolio.name}</strong>
        <span>© {portfolio.year} / ALL WORKS RESERVED</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
