import { portfolio, works, type PortfolioWork } from "@/content/portfolio";

function ArtworkVisual({
  image,
  artClass,
  alt,
  eager = false,
}: {
  image?: string;
  artClass: string;
  alt: string;
  eager?: boolean;
}) {
  if (image) {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    return (
      <img
        className="artwork-image"
        src={`${basePath}${image}`}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
      />
    );
  }

  return (
    <div
      className={`artwork-placeholder art--${artClass}`}
      role="img"
      aria-label={`${alt}（示例占位画面）`}
    >
      <span className="placeholder-label">IMAGE COMING SOON</span>
    </div>
  );
}

function GalleryItem({
  work,
  index,
}: {
  work: PortfolioWork;
  index: number;
}) {
  return (
    <figure className={`gallery-item gallery-item--${index + 1}`}>
      <div className="gallery-item__visual">
        <ArtworkVisual
          image={work.image}
          artClass={work.artClass}
          alt={work.alt}
          eager={index === 0}
        />
      </div>
      <figcaption>
        <div>
          <h2>{work.title}</h2>
          <p>{work.titleZh}</p>
        </div>
        <div className="gallery-item__details">
          <span>{work.medium}</span>
          <span>{work.year}</span>
        </div>
      </figcaption>
    </figure>
  );
}

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
          View selected works <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section
        className="selected-section"
        id="selected"
        aria-labelledby="selected-title"
      >
        <div className="section-bar">
          <h2 id="selected-title">Selected</h2>
          <span>{portfolio.range}</span>
          <span>{works.length.toString().padStart(2, "0")} works</span>
        </div>

        <div className="gallery-grid">
          {works.map((work, index) => (
            <GalleryItem key={work.slug} work={work} index={index} />
          ))}
        </div>
      </section>

      <section
        className="archive-section"
        id="archive"
        aria-labelledby="archive-title"
      >
        <div className="section-bar">
          <h2 id="archive-title">Archive</h2>
          <span>All works</span>
          <span>Updated {portfolio.year}</span>
        </div>

        <div className="archive-list">
          {works.map((work, index) => (
            <article key={work.slug}>
              <span>{(index + 1).toString().padStart(2, "0")}</span>
              <h3>
                {work.title}
                <small>{work.titleZh}</small>
              </h3>
              <span>{work.medium}</span>
              <span>{work.year}</span>
            </article>
          ))}
        </div>
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
