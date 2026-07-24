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

function WorkCard({
  work,
  index,
}: {
  work: PortfolioWork;
  index: number;
}) {
  return (
    <article className={`work-card work-card--${index + 1}`}>
      <div className="work-card__topline">
        <span>{work.medium}</span>
        <span>{work.year}</span>
      </div>
      <div className="work-card__visual">
        <ArtworkVisual
          image={work.image}
          artClass={work.artClass}
          alt={work.alt}
        />
        <span className="work-card__number">
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>
      <div className="work-card__caption">
        <h3>{work.title}</h3>
        <p>{work.titleZh}</p>
        <span aria-hidden="true">↗</span>
      </div>
    </article>
  );
}

export default function Home() {
  const leadWork = works.find((work) => work.featured) ?? works[0];

  return (
    <main id="top">
      <header className="site-header">
        <div className="topline">
          <span>INDEPENDENT ILLUSTRATION PRACTICE</span>
          <span>AVAILABLE FOR COMMISSIONS</span>
          <span>{portfolio.year} / ISSUE 01</span>
        </div>

        <div className="masthead">
          <a className="masthead__name" href="#top" aria-label="回到首页">
            {portfolio.name}
          </a>
          <div className="masthead__edition">
            <span>ARTIST</span>
            <strong>ARCHIVE</strong>
          </div>
        </div>

        <div className="navigation-row">
          <nav aria-label="主导航">
            <a href="#work">WORK</a>
            <a href="#about">ABOUT</a>
            <a href="#contact">CONTACT</a>
          </nav>
          <a className="navigation-row__email" href={`mailto:${portfolio.email}`}>
            EMAIL ME ↗
          </a>
        </div>
      </header>

      <section className="lead-grid" aria-labelledby="page-title">
        <div className="lead-copy">
          <p className="section-kicker">FEATURED / INTRODUCTION</p>
          <h1 id="page-title">{portfolio.headline}</h1>
          <p className="lead-copy__intro">{portfolio.intro}</p>
          <div className="lead-copy__actions">
            <a className="button button--dark" href="#work">
              VIEW THE WORK
            </a>
            <a className="text-link" href="#about">
              ARTIST PROFILE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <article className="lead-story">
          <div className="lead-story__flag">NEW / SELECTED WORK</div>
          <div className="lead-story__visual">
            <ArtworkVisual
              image={leadWork.image}
              artClass={leadWork.artClass}
              alt={leadWork.alt}
              eager
            />
          </div>
          <div className="lead-story__caption">
            <div>
              <p>{leadWork.medium}</p>
              <h2>
                {leadWork.title}
                <span>{leadWork.titleZh}</span>
              </h2>
            </div>
            <strong>{leadWork.year}</strong>
          </div>
        </article>
      </section>

      <div className="rolling-strip" aria-label="作品集信息">
        <div className="rolling-strip__track">
          <span>SELECTED WORKS {portfolio.range}</span>
          <i aria-hidden="true">●</i>
          <span>ILLUSTRATION / ART / EDITORIAL</span>
          <i aria-hidden="true">●</i>
          <span>A GARDEN OF IMAGINED PLACES</span>
        </div>
      </div>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p>01 / WORK</p>
          <h2 id="work-title">Selected Works</h2>
          <div>
            <span>{works.length.toString().padStart(2, "0")} PROJECTS</span>
            <span>{portfolio.range}</span>
          </div>
        </div>

        <div className="work-grid">
          {works.map((work, index) => (
            <WorkCard key={work.slug} work={work} index={index} />
          ))}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-section__index">
          <span>02</span>
          <p>ABOUT THE ARTIST</p>
        </div>

        <div className="about-section__statement">
          <p className="section-kicker">ARTIST STATEMENT</p>
          <h2 id="about-title">{portfolio.aboutTitle}</h2>
        </div>

        <div className="about-section__body">
          {portfolio.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <aside className="fact-list" aria-label="艺术家信息">
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
        <div className="contact-section__label">03 / CONTACT</div>
        <div className="contact-section__main">
          <p>HAVE A PROJECT IN MIND?</p>
          <h2 id="contact-title">{portfolio.contactTitle}</h2>
          <p>{portfolio.contactText}</p>
          <a href={`mailto:${portfolio.email}`}>
            {portfolio.email}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <strong>{portfolio.name}</strong>
        <span>© {portfolio.year} / ALL WORKS RESERVED</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
