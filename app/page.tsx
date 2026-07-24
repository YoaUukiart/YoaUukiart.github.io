import { portfolio, works } from "@/content/portfolio";

function ArtworkVisual({
  image,
  artClass,
  alt,
}: {
  image?: string;
  artClass: string;
  alt: string;
}) {
  if (image) {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    return (
      <img
        className="artwork-image"
        src={`${basePath}${image}`}
        alt={alt}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`artwork-placeholder art--${artClass}`}
      role="img"
      aria-label={`${alt}（示例占位画面）`}
    >
      <span className="placeholder-label">PLACEHOLDER</span>
    </div>
  );
}

export default function Home() {
  const featuredWorks = works.filter((work) => work.featured).slice(0, 4);

  return (
    <main id="top">
      <section className="hero-stage" aria-labelledby="page-title">
        <div className="stars" aria-hidden="true" />
        <div className="orbit orbit--one" aria-hidden="true" />
        <div className="orbit orbit--two" aria-hidden="true" />

        <header className="site-header">
          <a className="identity" href="#top" aria-label="回到首页">
            <strong>{portfolio.name}</strong>
            <span>PORTFOLIO · {portfolio.year}</span>
          </a>
          <nav aria-label="主导航">
            <a href="#work">WORK</a>
            <a href="#about">ABOUT</a>
            <a href="#contact">CONTACT</a>
          </nav>
        </header>

        <div className="hero-copy">
          <p className="eyebrow">{portfolio.eyebrow}</p>
          <h1 id="page-title">{portfolio.headline}</h1>
          <p className="hero-intro">{portfolio.intro}</p>
          <a className="garden-link" href="#work">
            ENTER THE GARDEN <span aria-hidden="true">↘</span>
          </a>
        </div>

        <section className="floating-gallery" aria-label="精选作品预览">
          {featuredWorks.map((work, index) => (
            <figure
              className={`floating-work floating-work--${index + 1}`}
              key={work.slug}
            >
              <div className="artwork-frame">
                <ArtworkVisual
                  image={work.image}
                  artClass={work.artClass}
                  alt={work.alt}
                />
              </div>
              <figcaption>
                <span>
                  {work.title} <em>{work.titleZh}</em>
                </span>
                <small>{work.year}</small>
              </figcaption>
            </figure>
          ))}
        </section>

        <div className="hero-edition" aria-hidden="true">
          <span>SELECTED WORKS {portfolio.range}</span>
          <span>A QUIET ARCHIVE OF IMAGINED PLACES · 01</span>
        </div>
      </section>

      <section className="work-archive" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p>01 / SELECTED WORKS</p>
          <h2 id="work-title">想象之地的标本集</h2>
          <span>{works.length.toString().padStart(2, "0")} WORKS</span>
        </div>

        <div className="archive-grid">
          {works.map((work, index) => (
            <article className="archive-card" key={work.slug}>
              <div className="archive-art">
                <ArtworkVisual
                  image={work.image}
                  artClass={work.artClass}
                  alt={work.alt}
                />
                <span className="work-number">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="archive-meta">
                <div>
                  <h3>{work.title}</h3>
                  <p>{work.titleZh}</p>
                </div>
                <div className="work-details">
                  <span>{work.medium}</span>
                  <span>{work.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-orbit" aria-hidden="true">
          <span />
        </div>
        <div className="about-label">02 / ABOUT</div>
        <div className="about-copy">
          <p className="eyebrow">ARTIST STATEMENT</p>
          <h2 id="about-title">{portfolio.aboutTitle}</h2>
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
      </section>

      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <p className="eyebrow">03 / CONTACT</p>
        <h2 id="contact-title">{portfolio.contactTitle}</h2>
        <p>{portfolio.contactText}</p>
        <a className="contact-link" href={`mailto:${portfolio.email}`}>
          {portfolio.email}
          <span aria-hidden="true">↗</span>
        </a>
        <footer>
          <span>© {portfolio.year} {portfolio.name}</span>
          <span>MADE FOR IMAGINED PLACES</span>
        </footer>
      </section>
    </main>
  );
}
