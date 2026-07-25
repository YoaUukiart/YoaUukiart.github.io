"use client";

import { useEffect, useRef, useState } from "react";

import type { PortfolioWork } from "@/content/portfolio";

type ProjectCarouselProps = {
  projectNumber: number;
  title: string;
  year: string;
  medium: string;
  description: string;
  works: PortfolioWork[];
};

export function ProjectCarousel({
  projectNumber,
  title,
  year,
  medium,
  description,
  works,
}: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const overlayOpen = lightboxIndex !== null || infoOpen;
  const projectLabel = projectNumber.toString().padStart(2, "0");
  const projectTitleId = `project-info-title-${projectLabel}`;

  useEffect(() => {
    if (!overlayOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleGlobalKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        setInfoOpen(false);
        setZoom(1);
        return;
      }

      if (lightboxIndex === null) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLightboxIndex((current) => {
          const next = Math.max((current ?? 0) - 1, 0);
          setActiveIndex(next);
          return next;
        });
        setZoom(1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setLightboxIndex((current) => {
          const next = Math.min((current ?? 0) + 1, works.length - 1);
          setActiveIndex(next);
          return next;
        });
        setZoom(1);
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [lightboxIndex, overlayOpen, works.length]);

  function showSlide(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), works.length - 1);
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollTo({
      left: track.clientWidth * nextIndex,
      behavior: "smooth",
    });
    setActiveIndex(nextIndex);
  }

  function handleScroll() {
    const track = trackRef.current;

    if (!track || track.clientWidth === 0) {
      return;
    }

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), works.length - 1));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      showSlide(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      showSlide(works.length - 1);
    }
  }

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setActiveIndex(index);
    setZoom(1);
  }

  function closeLightbox() {
    if (lightboxIndex !== null) {
      showSlide(lightboxIndex);
    }

    setLightboxIndex(null);
    setZoom(1);
  }

  function moveLightbox(direction: -1 | 1) {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      const next = Math.min(
        Math.max(current + direction, 0),
        works.length - 1,
      );
      setActiveIndex(next);
      return next;
    });
    setZoom(1);
  }

  function changeZoom(amount: number) {
    setZoom((current) =>
      Math.min(Math.max(Number((current + amount).toFixed(1)), 1), 4),
    );
  }

  const lightboxWork =
    lightboxIndex === null ? null : works[lightboxIndex] ?? null;

  return (
    <>
      <article className="project-carousel">
        <div
          className="project-carousel__viewer"
          role="region"
          aria-roledescription="carousel"
          aria-label={`${title}, ${works.length} images`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div
            ref={trackRef}
            className="project-carousel__track"
            onScroll={handleScroll}
          >
            {works.map((work, index) => (
              <figure
                className="project-slide"
                key={work.slug}
                aria-label={`${index + 1} of ${works.length}`}
                aria-hidden={index !== activeIndex}
              >
                <button
                  className="project-slide__open"
                  type="button"
                  aria-label={`Open image ${index + 1} in full-screen viewer`}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => openLightbox(index)}
                >
                  {work.image ? (
                    <>
                      {/* Original artwork files are shown without recompression. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${basePath}${work.image}`}
                        alt={work.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                        draggable={false}
                      />
                    </>
                  ) : (
                    <div
                      className={`artwork-placeholder art--${work.artClass}`}
                    >
                      <span className="placeholder-label">
                        IMAGE COMING SOON
                      </span>
                    </div>
                  )}
                  <span className="project-slide__hint">
                    View full size <span aria-hidden="true">↗</span>
                  </span>
                </button>
              </figure>
            ))}
          </div>

          <button
            className="project-carousel__arrow project-carousel__arrow--previous"
            type="button"
            aria-label="Previous image"
            onClick={() => showSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
          >
            ←
          </button>
          <button
            className="project-carousel__arrow project-carousel__arrow--next"
            type="button"
            aria-label="Next image"
            onClick={() => showSlide(activeIndex + 1)}
            disabled={activeIndex === works.length - 1}
          >
            →
          </button>
        </div>

        <div className="project-carousel__caption">
          <div>
            <p>PROJECT {projectLabel}</p>
            <h2>
              <button
                className="project-carousel__title"
                type="button"
                aria-haspopup="dialog"
                onClick={() => setInfoOpen(true)}
              >
                {title}
                <span aria-hidden="true">↗</span>
              </button>
            </h2>
          </div>
          <p className="project-carousel__details">
            {medium}
            <span>{year}</span>
            <span>{works.length} IMAGES</span>
          </p>
          <p className="project-carousel__counter" aria-live="polite">
            {(activeIndex + 1).toString().padStart(2, "0")}
            <span> / {works.length.toString().padStart(2, "0")}</span>
          </p>
        </div>

        <div className="project-carousel__pagination" aria-label="Choose image">
          {works.map((work, index) => (
            <button
              key={work.slug}
              type="button"
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => showSlide(index)}
            />
          ))}
        </div>
      </article>

      {lightboxWork?.image && lightboxIndex !== null ? (
        <div
          className="artwork-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title}, full-screen image ${lightboxIndex + 1}`}
        >
          <header className="artwork-lightbox__header">
            <div>
              <strong>{title}</strong>
              <span>
                {(lightboxIndex + 1).toString().padStart(2, "0")} /{" "}
                {works.length.toString().padStart(2, "0")}
              </span>
            </div>

            <div className="artwork-lightbox__zoom" aria-label="Zoom controls">
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => changeZoom(-0.5)}
                disabled={zoom === 1}
              >
                −
              </button>
              <button
                type="button"
                aria-label="Reset zoom"
                onClick={() => setZoom(1)}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => changeZoom(0.5)}
                disabled={zoom === 4}
              >
                +
              </button>
            </div>

            <button
              className="artwork-lightbox__close"
              type="button"
              aria-label="Close full-screen viewer"
              onClick={closeLightbox}
            >
              Close ×
            </button>
          </header>

          <div
            className="artwork-lightbox__scroll"
            onDoubleClick={() => setZoom((current) => (current === 1 ? 2 : 1))}
          >
            <div
              className="artwork-lightbox__stage"
              style={{
                width: `${zoom * 100}%`,
                height: `${zoom * 100}%`,
              }}
            >
              {/* Original artwork files are shown without recompression. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}${lightboxWork.image}`}
                alt={lightboxWork.alt}
                draggable={false}
              />
            </div>
          </div>

          <footer className="artwork-lightbox__footer">
            <button
              type="button"
              onClick={() => moveLightbox(-1)}
              disabled={lightboxIndex === 0}
            >
              ← Previous
            </button>
            <span>Double-click image to zoom</span>
            <button
              type="button"
              onClick={() => moveLightbox(1)}
              disabled={lightboxIndex === works.length - 1}
            >
              Next →
            </button>
          </footer>
        </div>
      ) : null}

      {infoOpen ? (
        <div
          className="project-info"
          role="dialog"
          aria-modal="true"
          aria-labelledby={projectTitleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setInfoOpen(false);
            }
          }}
        >
          <article className="project-info__panel">
            <header>
              <span>YoaUuki / Project {projectLabel}</span>
              <button
                type="button"
                aria-label="Close project information"
                onClick={() => setInfoOpen(false)}
              >
                Close ×
              </button>
            </header>

            <div className="project-info__layout">
              <div className="project-info__image">
                {/* Original artwork files are shown without recompression. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}${works[0]?.image ?? ""}`}
                  alt=""
                  draggable={false}
                />
              </div>

              <div className="project-info__copy">
                <p>PROJECT {projectLabel}</p>
                <h2 id={projectTitleId}>{title}</h2>

                <dl>
                  <div>
                    <dt>Medium</dt>
                    <dd>{medium}</dd>
                  </div>
                  <div>
                    <dt>Year</dt>
                    <dd>{year}</dd>
                  </div>
                  <div>
                    <dt>Series</dt>
                    <dd>{works.length} digital paintings</dd>
                  </div>
                </dl>

                <p className="project-info__description">{description}</p>
                <p className="project-info__copyright">
                  © {year} YoaUuki. All works reserved.
                </p>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
